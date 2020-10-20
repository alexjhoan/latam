import React from "react";
import App from "next/app";
import * as Sentry from "@sentry/browser";
import { RedirectToHome } from "../lib/legacy";
import LogRocket from "logrocket";
import getConfig from "next/config";
import Router from "next/router";
import NProgress from "nprogress";

import "../shared-components/Styles/loader.less";

import "../shared-components/Styles/AntThemes/InfocasasTheme.less";
// import "../shared-components/Styles/AntThemes/AoCuboTheme.less";

import i18n from "../shared-components/i18n";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const { sentryDNS, logrocketID, NODE_ENV, APP_NAME, APP_VERSION } = getConfig().publicRuntimeConfig;

class FeedbackTransport extends Sentry.Transports.XHRTransport {
	sendEvent(event) {
		return super.sendEvent(event).finally(() => RedirectToHome());
	}
}

if (sentryDNS) {
	Sentry.init({
		dsn: sentryDNS,
		debug: NODE_ENV === "development",
		environment: NODE_ENV,
		release: APP_NAME + " " + APP_VERSION,
		beforeSend: (e, h) => {
			// use this function if we want to discard some errors (just returning null instead of event e)
			
			// si no hay internet no manda error
			if (typeof window != "undefined" && !window.navigator.onLine) return null;
			const error = h.originalException;
			// no manda el error de typeerror cancelled

			if (
				error &&
				error.message &&
				error.message.match(/(typeError|network error):\s*(cancelado|cancelled)/i)
			){
				return null;
			}

			return e;
		},
		transport: FeedbackTransport,
	});
}
if (typeof window !== "undefined" && logrocketID) {
	LogRocket.init(logrocketID, {
		release: APP_NAME + "-" + APP_VERSION + "-" + NODE_ENV,
	});
	LogRocket.getSessionURL(sessionURL => {
		Sentry.configureScope(scope => scope.setExtra("sessionURL", sessionURL));
	});
}

class MyApp extends App {
	componentDidCatch(error, errorInfo) {
		Sentry.withScope(scope => {
			Object.keys(errorInfo).forEach(key => scope.setExtra(key, errorInfo[key]));
			Sentry.captureException(error);
		});
		super.componentDidCatch(error, errorInfo);
	}

	componentDidMount(){
		// scroll top when page changes
		Router.events.on('routeChangeComplete', () => window.scroll({  top: 0,  left: 0,  behavior: 'smooth'}));
		// end
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<React.Fragment>
				<Component {...pageProps} />			
			</React.Fragment>
		);
	}
}

export default MyApp;
