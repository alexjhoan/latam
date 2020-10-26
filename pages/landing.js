import { BannerPopUp } from "../shared-components/Components/Banners/BannerPopUp/web";
import { HomeLayout } from "../shared-components/ViewFragments/Home/web";
import React, { useEffect } from "react";
import { withApollo } from "../lib/apollo3";
import { withAuth } from "../lib/auth";
import { withContext } from "../lib/context";
import { useOneSignal } from "../shared-components/GlobalHooks/web/OneSignal.hook";
import Header from "../shared-components/ViewFragments/Header/web";
import LandingComponent from "../components/LandingComponent"

// Home Page
const Home = () => {
	const OneSignal = useOneSignal();

	useEffect(() => {

		OneSignal.Init();
	}, []);

	return (
		<React.Fragment>
			<Header />
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
