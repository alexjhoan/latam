import { MetaTags } from "../shared-components/Components/SEO/web";
import React from "react";
import { withApollo } from "../lib/apollo3";
import { withAuth } from "../lib/auth";
import { withContext } from "../lib/context";
import { useFacebookPixel } from "../shared-components/GlobalHooks/web/FacebookPixel.hook";
import { useGoogleAnalytics } from "../shared-components/GlobalHooks/web/GoogleAnalytics.hook";
import { useGoogleTagManager } from "../shared-components/GlobalHooks/web/GoogleTagManager.hook";
import { useOneSignal } from "../shared-components/GlobalHooks/web/OneSignal.hook";
import LandingComponent from "../components/LandingComponent"

import dynamic from "next/dynamic";
const LandingHeader = dynamic(() => import("../components/LandingHeader").then((mod) => mod.LandingHeader), {
  ssr: false,
});

// Home Page
const Home = () => {
	
	useFacebookPixel();
	useGoogleAnalytics();
	useGoogleTagManager();
	useOneSignal();

	return (
		<React.Fragment>
			{/* Meta Tags */}
			<MetaTags />
			{/*
			<Header />
			*/}
			<LandingHeader />
			<LandingComponent />
		</React.Fragment>
	);
};

Home.getInitialProps = async function({ req }) {
	
	return {
		
	};
};

export default withApollo(
	withContext(withAuth(Home), {
		withDummyContext: false,
		withFiltersContext: true,
		withConfigContext: true,
		withThemeContext: true,
	})
);
