import React from 'react'
import { useTheme } from "../shared-components/Styles/ThemeHook";
import NavBar from "./NavBar"
import Banner from "./Banner"
import OpenDay from "./OpenDay"
import OpenDayHotSale from "./OpenDayHotSale"
import Talks from "./Talks"
import Properties from "./Properties"
import Sponsor from "./Sponsor"
import BigData from "./BigData"
import Footer from "./Footer"

export default function LandingComponent() {
	const { theme } = useTheme();
	return (
		<React.Fragment>
			<NavBar />
			<Banner />
			<OpenDay />
			<Properties />
			<Talks />
			<Sponsor />
			<BigData />
			<Footer />
			<style jsx global>{`
				html{
					scroll-behavior: smooth;
				}
				#openday, #properties, #talks, #sponsor, #bigdata {
					margin-top: -120px;
					padding-top: 140px;
				}
				.containerLanding{
					width: 100%;
					flex: 0 0 100%;
					max-width: 1400px;
			    margin: 0 auto;
			    padding: 0 15px 15px;
				}
				.dRowCenter{
					display: flex;
			    flex-direction: row;
			    justify-content: center;
			    align-items: center;
			    position: relative;
				}
				.dColumnCenter{
					display: flex;
			    flex-direction: column;
			    justify-content: center;
			    align-items: center;
			    position: relative;
				}
				.textCenter{
					text-align: center;
				}
				.dNone{
					display: none!important;
				}
				.dBlock{
					display: block!important;
				}
				.dFlex{
					display: flex!important;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.dSmNone{
						display: none!important;
					}
					.dSmBlock{
						display: block!important;
					}
					.dSmFlex{
						display: flex!important;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
					.containerLanding{
						width: 90%;
						flex: 0 0 90%;
					}
					.dMdNone{
						display: none!important;
					}
					.dMdBlock{
						display: block!important;
					}
					.dMdInlineBlock{
						display: inline-block!important;
					}
					.dMdFlex{
						display: flex!important;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.dLgNone{
						display: none!important;
					}
					.dLgBlock{
						display: block!important;
					}
					.dLgFlex{
						display: flex!important;
					}
				}
				@media (min-width: ${theme.breakPoints.xl}){
					.containerLanding{
						width: 80%;
						flex: 0 0 80%;
					}
				}
			`}</style>
		</React.Fragment>
	)
}