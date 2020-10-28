import React from "react";
import Head from "next/head";
import Cookies from "universal-cookie";
import fetch from "isomorphic-unfetch";
import { message } from "antd";
import { OfflineToastLoader } from "../shared-components/Components/NoConectionToast/web";
import Console from "./console";
import * as Sentry from "@sentry/browser";
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	concat,
	fromPromise,
	InMemoryCache,
	gql,
	ApolloQueryResult,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { openAuthModal } from "../shared-components/Components/User/AuthModal/web";
let apolloClient = null;

const CONFIG_QUERY = gql`
	query InitialConfig {
		configuration {
			country_id
			country_name
			country_capital
			country_capital_id
			country_code
			site_name
			logo
			information_email
			sales_email
			currency {
				id
				name
			}
			timezone
			IVA
			analytics_id
			google_tag_manager_id
			rtb_id
			onesignal_configuration {
				app_id
			}
			facebook_configuration {
				pixel_id
			}
			pinterest_id
			instagram_client_id
			header_configuration {
				buttons {
					text
				}
			}
			socialMediaLinks {
				slug
				name
				url
				icon
			}
			header_links {
				id
				title
				link
				banner_params
				links {
					header_link_id
					title
					link
					links {
						title
						link
						category
					}
				}
			}
		}
	}
`;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true, domain = null } = {}) {
	const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
		if (domain == null && typeof window !== "undefined") {
			domain = window.location.host;
		}

		const token =
			typeof window !== "undefined"
				? new Cookies(document.cookie).get("frontend_token")
				: null;
		const client = apolloClient || initApolloClient(apolloState, token, domain);
		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
			</ApolloProvider>
		);
	};

	if (ssr || PageComponent.getInitialProps) {
		WithApollo.getInitialProps = async ctx => {
			const { AppTree } = ctx;
			const cookie = new Cookies(
				typeof window === "undefined" ? ctx.req.headers.cookie : document.cookie
			);
			if (domain == null) {
				domain =
					typeof window === "undefined" ? ctx.req.headers.host : window.location.host;
			}

			const apolloClient = (ctx.apolloClient = initApolloClient(
				typeof ctx.req?.session !== "undefined" ? ctx.req.session.persisted_cache : {},
				cookie.get("frontend_token"),
				domain
			));

			let configQuery = null;
			try {
				configQuery = await apolloClient.query({ query: CONFIG_QUERY });
			} catch (error) {
				console.log("--------------------------------------------------");
				console.log("Initial Config querry error: ", error.graphQLErrors);
				console.log("--------------------------------------------------");
			}

			// Run wrapped getInitialProps methods
			let pageProps = {};
			if (PageComponent.getInitialProps) {
				pageProps = await PageComponent.getInitialProps(ctx);
			}

			// Only on the server:
			if (typeof window === "undefined") {
				// When redirecting, the response is finished.
				// No point in continuing to render
				if (ctx.res && ctx.res.finished) {
					return pageProps;
				}

				// Only if ssr is enabled
				if (ssr) {
					try {
						// Run all GraphQL queries
						await getDataFromTree(
							<AppTree
								pageProps={{
									...pageProps,
									apolloClient,
								}}
							/>
						);
					} catch (error) {
						// Prevent Apollo Client GraphQL errors from crashing SSR.
						// Handle them in components via the data.error prop:
						// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
						Console.log("---------------------");
						Console.error("Error while running `getDataFromTree`");
						Console.log("\x1b[36m");
						Console.log(error);
						Console.log("\x1b[0m");
						Console.log(error.extensions);
						Console.log("--------------------");
					}

					// getDataFromTree does not call componentWillUnmount
					// head side effect therefore need to be cleared manually
					Head.rewind();
				}
			}

			// Extract query data from the Apollo store
			const apolloState = apolloClient.cache.extract();

			return {
				...pageProps,
				apolloState,
				ConfigContextInitialState: configQuery?.data?.configuration ?? null,
				country_id: configQuery?.data?.configuration?.country_id ?? null,
			};
		};
	}

	return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState = {}, token, domain) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)

	if (typeof window === "undefined") {
		return createApolloClient(initialState, token, domain);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		// via https://github.com/apollographql/apollo-client/issues/5089
		//apolloClient = createApolloClient(initialState);
		apolloClient = createApolloClient(initialState, token, domain);
	}

	return apolloClient;
}

class ForceErrorLink extends ApolloLink {
	public error = null;
	constructor(error) {
		super();
		this.error = error;
	}
	request(operation, forward) {
		return new Observable(observer => {
			observer.error(this.error);
		});
	}
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, token, domain) {
	const miMiddleware = xxx =>
		new ApolloLink((operation, forward) => {
			let anulable = false;

			if (
				operation.query &&
				operation.query.definitions &&
				operation.query.definitions.length > 0
			) {
				operation.query.definitions.map(o => {
					if (o.name && o.name.value) {
						Console.warn(
							"Apollo is running query:  \x1b[36m" + o.name.value + "\x1b[0m"
						);
					}
				});
			} else {
				Console.warn("Apollo is running query \x1b[36m" + "without name" + "\x1b[0m");
			}

			if (anulable) {
				const link = new ForceErrorLink({
					errors: [{ message: "Local Unauthorized" }],
				});
				return link.request(operation, null);
			}

			const auth =
				typeof window !== "undefined"
					? new Cookies(document.cookie).get("frontend_token")
					: token;

			operation.setContext({
				headers: {
					authorization: auth ? `Bearer ${auth}` : "",
					"x-origin": "www.infocasas.com.uy",
				},
			});

			return forward(operation);
		});

	const cache = new InMemoryCache().restore(initialState);

	const httpLink = new BatchHttpLink({
		uri: process.env.graphQL_uri, // Server URL (must be absolute)
		credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
		fetch,
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		const _token = "gika";
		const _domain = "localhost:3000";
		return {
			headers: {
				...headers,
				authorization: _token ? `Bearer ${_token}` : "",
				"x-origin": "www.infocasas.com.uy",
			},
		};
	});

	const links = [errorLink, authLink, httpLink];
	const link = ApolloLink.from(links);

	return new ApolloClient({
		ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
		link: concat(
			errorLink,
			concat(
				miMiddleware("GOOD"),
				new BatchHttpLink({
					uri: process.env.graphQL_uri, // Server URL (must be absolute)
					credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
					fetch,
				})
			)
		),
		cache: cache,
		defaultOptions: {
			watchQuery: {
				fetchPolicy: "cache-first",
			},
			query: {
				fetchPolicy: "cache-first",
			},
		},
	});
}

export function handleApolloError(error) {
	console.error(JSON.stringify(error)); //debug even more info
	let abort = true;
	//use this to filter some benign errors
	// filtro Network Errors por aquellos que se dan al perder la conexion a internet
	// al filtrar por "Network Error: failed to fetch" safari no devolvia ese mensaje de error entonces no filtraba bien en esos casos, ademas el mensaje dependia del lenguaje del dispositivo por lo que eran multiples mensajes a filtrar y podia ser que aparecieran otros mensajes diferentes.
	// filtrando los Network Errors tambien filtraba algunos errores importantes como Network Error: ServerError statusCode 500
	// por eso tambien se agrego a la condincion que no estuviera online !navigator.onLine
	if (
		error &&
		error.message &&
		error.message.match(/Network error/) &&
		typeof navigator != "undefined" &&
		!navigator.onLine
	) {
		message.open({
			key: "noConnection",
			content: <OfflineToastLoader />,
			icon: null,
			type: null,
			duration: 3,
		});
	} else {
		Sentry.captureException(error);
	}
	return abort;
}

let isRefreshing = false;
let pendingRequests = [];

const resolvePendingRequests = () => {
	console.log("resolve pending requests", pendingRequests);
	pendingRequests.map(callback => callback());
	pendingRequests = [];
};

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward, location, ...other }) => {
		console.log("On error");
		console.log(graphQLErrors, networkError, other);
		Console.log("Query con error: \x1b[36m" + operation.operationName + "\x1b[0m");

		if (typeof window === "undefined") {
			return;
		}

		if (graphQLErrors && graphQLErrors.filter(e => e).length > 0) {
			for (let err of graphQLErrors) {
				if (err.debugMessage && err.debugMessage.includes("Unauthenticated")) {
					let forward$;
					if (!isRefreshing) {
						isRefreshing = true;
						forward$ = fromPromise(
							openAuthModal({ withPromise: true })
								.then(o => {
									console.log("LOGIN ACEPTADO: ", o);
									if (true) {
										//@todo-login
										console.log("COOKIE SETIADA");
										resolvePendingRequests();
									} else {
										console.log("ALGO SALIO MAL, NO HAY COOKIE");
									}
									return true;
								})
								.catch(error => {
									console.log("LOGIN RECHAZADO: ", error);
									pendingRequests = [];
									return;
								})
								.finally(() => {
									isRefreshing = false;
								})
						).filter(value => {
							return Boolean(value);
						});
					} else {
						// Will only emit once the Promise is resolved
						forward$ = fromPromise(
							new Promise(resolve => {
								pendingRequests.push(() => resolve());
							})
						);
					}
					return forward$.flatMap(() => {
						console.log("Forwarding!");
						console.log(operation);
						return forward(operation);
					});
				} else {
					Sentry.captureException(err);
				}
			}
		}

		if (networkError) {
			console.log("Network error: ", networkError);
			message.open({
				key: "noConnection",
				content: <OfflineToastLoader />,
				icon: null,
				type: null,
				duration: 3,
			});
		}
	}
);
