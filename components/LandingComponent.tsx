import React from 'react'
import { useTheme } from "../shared-components/Styles/ThemeHook";
import NavBar from "./NavBar"
import Banner from "./Banner"
import OpenDay from "./OpenDay"
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
			<Talks />
			<Sponsor />
			<BigData />
			<Footer />
			<style jsx global>{`
				html{
					scroll-behavior: smooth;
				}
				.containerLanding{
					width: 90%;
					flex: 0 0 90%;
					max-width: 1400px;
			    margin: 0 auto;
			    padding: 128px 15px 5vh;
				}
				.dRowCenter{
					display: flex;
			    flex-direction: row;
			    justify-content: center;
			    align-items: center;
				}
				.dColumnCenter{
					display: flex;
			    flex-direction: column;
			    justify-content: center;
			    align-items: center;
				}
				.textCenter{
					text-align: center;
				}
				.dNone{
					display: none;
				}
				.dBlock{
					display: block;
				}
				.dFlex{
					display: flex;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.dSmNone{
						display: none;
					}
					.dSmBlock{
						display: block;
					}
					.dSmFlex{
						display: flex;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
					.dMdNone{
						display: none;
					}
					.dMdBlock{
						display: block;
					}
					.dMdFlex{
						display: flex;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.containerLandin{
						width: 80%;
						flex: 0 0 80%;
					}
					.dLgNone{
						display: none;
					}
					.dLgBlock{
						display: block;
					}
					.dLgFlex{
						display: flex;
					}
				}
			`}</style>
		</React.Fragment>
	)
}