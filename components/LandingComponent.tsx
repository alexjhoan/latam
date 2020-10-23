import React from 'react'
import { useTheme } from "../shared-components/Styles/ThemeHook";
import NavBar from "./NavBar"
import Banner from "./Banner"
import OpenDay from "./OpenDay"

export default function LandingComponent() {
	const { theme } = useTheme();
	return (
		<React.Fragment>
			<NavBar />
			<Banner />
			<OpenDay />
			<style jsx global>{`
				.containerLanding{
					width: 90%;
					flex: 0 0 90%;
					max-width: 1400px;
			    margin: 0 auto;
			    padding: 5vh 15px;
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