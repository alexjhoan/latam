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
					margin-top: -100px;
				}
				.containerLanding{
					width: 90%;
					flex: 0 0 90%;
					max-width: 1400px;
			    margin: 128px auto 0;
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
				@media (min-width: ${theme.breakPoints.xxl}){
					.containerLanding{
						width: 80%;
						flex: 0 0 80%;
					}
				}
			`}</style>
		</React.Fragment>
	)
}