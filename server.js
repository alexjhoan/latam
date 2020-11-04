/*const dotenv = require('dotenv').config({ path: 'process.env' })
if (dotenv.error) {
  throw dotenv.error
}*/
const ENV = require("./next.config").env;
const express = require("express");
const next = require("next");
const port =
	typeof process.env.PORT !== "undefined" ? parseInt(process.env.PORT) : 3000;
const dev = process.env.NODE_ENV === "development";
const app = next({ dev });
const handle = app.getRequestHandler();
const session = require("express-session");
const bodyParser = require("body-parser");
const MemcachedStore = require("connect-memjs")(session);
const base64 = require("base-64");
const Cookies = require("universal-cookie");
const fetch = require("isomorphic-unfetch");
const { withConfigConsumer } = require("antd/lib/config-provider/context");
const ROUTER_QUERY = `
  query routerChecker($url: String!) {
    routeChecker(url: $url) {
      status
      view
      extras
    }
  }`;

console.log("\n**********************");
console.log("Starting Express server...");
console.log({
	NODE_ENV: process.env.NODE_ENV,
	NODE_I: parseInt(process.env.NODE_I, 10) || 0,
	...ENV,
});
console.log("**********************\n");

app
	.prepare()
	.then(() => {
		const server = express();

		server.use(bodyParser.json());

		server.use(
			session({
				name: "frontend_session_id",
				store: ENV.memcached_uri
					? new MemcachedStore({
							servers: [ENV.memcached_uri],
					  })
					: null,
				resave: false,
				rolling: false,
				saveUninitialized: true,
				secret: "S3cret...",
			})
		);

		/*
      server.get("/:operacion(alquiler|venta)/*", (req, res) => {
        return app.render(req, res, "/about");
      });
    */

		server.get("/_next/status", (req, res) => {
			res.sendStatus(200);
		});
		server.post("/_next/session", (req, res) => {
			const a = req.body;
			if (typeof a["session_set"] === "undefined") {
				res.sendStatus(403);
				return;
			}

			const s = a["session_set"];

			if (typeof s.not_yet_persisted_cachex !== "undefined") {
				if (typeof req.session.peristed_cache === "undefined") {
					req.session.persisted_cache = {};
				}
				for (const item in s.not_yet_persisted_cachex) {
					req.session.persisted_cache[item] = s.not_yet_persisted_cachex[item];
				}
			}

			res.sendStatus(200);
		});
		/* next specific routes, next handle static files */
		server.get("/_next/*", (req, res) => handle(req, res));
		server.get("/tests/tuvieja", (req, res) =>  app.render(req, res, "/tests/login"));
		server.get(/__nextjs_original-stack-frame/, (req, res) => handle(req, res));
		server.get("/fonts/*", (req, res) => handle(req, res));
		server.get("/main.js.map", (req, res) => handle(req, res));

		/*********************************************************
		 *** render page without passing through RouterChecker ***
		 *********************************************************/
		server.get("/", (req, res) => app.render(req, res, "/home"));
		// redirecciona el listado
		// server.get(/^\/(venta|alquiler|alquiler-temporal)(\/|\?|$)/, (req, res) => {
		//   return app.render(req, res, "/demo");
		// });

		/*********************************************************
		 ************* render page with RouterChecker ************
		 *********************************************************/
		// https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
		// de esta forma ignora completamente el router de next
		server.all("*", async (req, res) => {
			const parsedURL = req.url;
			console.log("///// PARSED URL : ", parsedURL, "/////\n");
			const cookie = new Cookies(req.headers.cookie);
			const token = cookie.cookies.frontend_token;
			const domain = req.headers.host;
			const { data, ...rest } = await fetch(ENV.graphQL_uri, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-origin": domain,
					authorization: token ? `Bearer ${token}` : "",
				},
				body: JSON.stringify({
					query: ROUTER_QUERY,
					variables: { url: parsedURL },
				}),
			}).then(res => res.json());

			if (data) {
				if (data.routeChecker.status == "200") {
					res.locals = data.routeChecker.extras;
					// ahora algunas van a renderizar un 404 pq no exite la page
					console.log("render page: ", data.routeChecker.view);
					return app.render(req, res, "/" + data.routeChecker.view, {
						...req.query,
						hashed: base64.encode(
							unescape(
								encodeURIComponent(JSON.stringify(data.routeChecker.extras))
							)
						),
					});
				} else if (data.routeChecker.status == "301") {
					res.writeHead(301, { Location: data.routeChecker.extras.redirect });
					res.end();
				} else {
					res.status(data.routeChecker.status);
				}
			} else {
				res.status(500).send("Hubo un problema: " + rest.message);
			}

			return handle(req, res);
		});

		server.listen(port, err => {
			if (err) throw err;
			console.log(`> Ready on PORT: ${port}`);
		});
	})
	.catch(err => {
		console.error("SERVER ERROR");
		console.log(err);
	});
