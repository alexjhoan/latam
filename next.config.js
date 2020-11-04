// next.config.js
// https://github.com/zeit/next.js/blob/canary/packages/next/next-server/server/config.ts
const withFonts = require("next-fonts");
const withTM = require("next-transpile-modules")(["frappe-charts"]);
const TerserPlugin = require("terser-webpack-plugin");
const packageJson = require("./package.json");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const withLess = require("@zeit/next-less");

//const nextBuildId = require('next-build-id');

const custom_env = {};

if (process.env.NODE_ENV === "production") {
	custom_env.graphQL_uri = "https://graph.infocasas.com.uy/graphql";
	custom_env.memcached_uri = "";
	custom_env.assetPrefix = "https://cdn2.infocasas.com.uy/frontend";
	custom_env.distDir = "build-production";
	custom_env.sentryDNS = "https://aebadfdd38f84af784967d42f1ca072b@sentry.io/2679673";
	custom_env.googleClientID =
		"294615345597-9ghmg15vcsfar1b1sqvcqphukull84gn.apps.googleusercontent.com";
	custom_env.facebookAppID = "1402860790042682";
	custom_env.logrocketID = "lkvvhi/infocasas";
	custom_env.googleMapsApiKey = "AIzaSyDBA9FLlSyCGsbvPX-IGZm5BdAFnM04zUw";
} else if (process.env.NODE_ENV === "beta") {
	//custom_env.graphQL_uri = "https://graph.infocasas.com.uy/graphql";
	custom_env.graphQL_uri = "https://bgraph.infocasas.com.uy/graphql";
	custom_env.memcached_uri = "memcached-php-prod2.kvtekg.cfg.usw2.cache.amazonaws.com:11211";
	custom_env.assetPrefix = "https://cdn2.infocasas.com.uy/frontend-beta";
	custom_env.distDir = "build-beta";
	custom_env.sentryDNS = "https://aebadfdd38f84af784967d42f1ca072b@sentry.io/2679673";
	custom_env.googleClientID =
		"294615345597-9ghmg15vcsfar1b1sqvcqphukull84gn.apps.googleusercontent.com";
	custom_env.facebookAppID = "1402860790042682";
	custom_env.logrocketID = "";
	custom_env.googleMapsApiKey = "AIzaSyDBA9FLlSyCGsbvPX-IGZm5BdAFnM04zUw";
} else if (process.env.NODE_ENV === "development") {
	//custom_env.graphQL_uri = "http://192.168.10.10/graphql";
	custom_env.graphQL_uri = "https://bgraph.infocasas.com.uy/graphql";
	custom_env.memcached_uri = "";
	custom_env.assetPrefix = "";
	custom_env.distDir = ".next";
	custom_env.sentryDNS = ""; //    "https://aebadfdd38f84af784967d42f1ca072b@sentry.io/2679673";
	custom_env.googleClientID =
		"294615345597-9ghmg15vcsfar1b1sqvcqphukull84gn.apps.googleusercontent.com";
	custom_env.facebookAppID = "1402860790042682";
	custom_env.logrocketID = "";
	custom_env.googleMapsApiKey = "AIzaSyDBA9FLlSyCGsbvPX-IGZm5BdAFnM04zUw";
}

module.exports = withTM(
	withFonts(
		withLess({
			distDir: custom_env.distDir,
			env: {
				...custom_env,
			},
			publicRuntimeConfig: {
				NODE_ENV: process.env.NODE_ENV,
				sentryDNS: custom_env.sentryDNS,
				googleClientID: custom_env.googleClientID,
				facebookAppID: custom_env.facebookAppID,
				googleMapsApiKey: custom_env.googleMapsApiKey,
				logrocketID: custom_env.logrocketID,
				APP_NAME: packageJson.name,
				APP_VERSION: packageJson.version,
			},
			typescript: {
				ignoreBuildErrors: true,
			},
			enableSvg: true,
			cssModules: false, // esto estaba en true
			compress: false, //que lo haga nginx!
			assetPrefix: custom_env.assetPrefix,
			webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
				config.module.rules.push({
					test: /\.(woff|woff2|eot|ttf|svg)$/,
					loader: "url-loader?limit=100000",
				});

				config.module.rules.push({
					test: /\.css$/i,
					
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						
						"css-loader",
					],
				});
				
				config.module.rules.push({
					test: /\.less$/,
					use: [
						{
							loader: "less-loader",
							options: {
								lessOptions: {
									javascriptEnabled: true,
								},
							},
						},
						{
							loader: "js-to-styles-var-loader",
						},
					],
				});

				config.optimization.minimizer = [
					new TerserPlugin({
						extractComments: true,
						parallel: true,
						sourceMap:false,						
					}),
				];
				config.plugins.push(
					new AntdDayjsWebpackPlugin(),
					new MiniCssExtractPlugin({ ignoreOrder: false }),
					new FilterWarningsPlugin({
						exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
					})
				);

				return {
					...config,

					node: {
						fs: "empty",
					},
				};
			},
		})
	)
);
