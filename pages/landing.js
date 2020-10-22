import { BannerPopUp } from "../shared-components/Components/Banners/BannerPopUp/web";
import { HomeLayout } from "../shared-components/ViewFragments/Home/web";
import { MetaTags } from "../shared-components/Components/SEO/web";
import React, { useEffect } from "react";
import { withApollo } from "../lib/apollo3";
import { withAuth } from "../lib/auth";
import { withContext } from "../lib/context";
import { useFacebookPixel } from "../shared-components/GlobalHooks/web/FacebookPixel.hook";
import { useGoogleAnalytics } from "../shared-components/GlobalHooks/web/GoogleAnalytics.hook";
import { useGoogleTagManager } from "../shared-components/GlobalHooks/web/GoogleTagManager.hook";
import { useOneSignal } from "../shared-components/GlobalHooks/web/OneSignal.hook";
import Header from "../shared-components/ViewFragments/Header/web";
import NavBar from "../components/NavBar"

// Home Page
const Home = () => {
	const FBpixel = useFacebookPixel();
	const GA = useGoogleAnalytics();
	const GTM = useGoogleTagManager();
	const OneSignal = useOneSignal();

	useEffect(() => {
		FBpixel.Init();
		FBpixel.PageViewEvent();

		GA.Init();
		GA.PageViewEvent();
		setTimeout(() => GA.Event({ category: "IC2", action: "Home" }), 5000);
		setTimeout(() => {
			GA.Event({ category: "usario_valido", action: "el usuario paso mas de 30 segundos" });
		}, 30000);

		GTM.Init();
		GTM.PageViewEvent({ page: "landing test" });

		OneSignal.Init();
	}, []);

	return (
		<React.Fragment>
			{/* Meta Tags */}
			<MetaTags />
			<Header />
			<NavBar />
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
