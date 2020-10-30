import React from 'react'
import {Row, Col, Button} from "antd";
import { useTheme } from "../shared-components/Styles/ThemeHook";

export default function OpenDay() {
	const { theme } = useTheme();

	return (
		<React.Fragment>
			<Row id="openday" className="OpenDayLanding">
		    <img src="/images/icons/lineLeft.png" alt="." className="dNone lineLeft"/>
		    <img src="/images/icons/lineRight.png" alt="." className="dNone lineRight"/>
				<Col xs={24} className="containerLanding OpenDayContainer">
					<div className="dColumnCenter textCenter title">
	      		<img src="/images/openDay.png" alt="." />
		      	<p>Mirá el video y conocé los 7 lanzamientos exclusivos con precios especiales para inversores!</p>
		      	<p className="secondParagraph">Congelá precio y condiciones por 7 días con una seña FLASH, que podés pagar online desde Argentina y cualquier parte del mundo!</p>
					</div>
					<div className="viewVideo">
						<div className="titleVideo dRowCenter dNone dLgFlex">
			    		<img src="/images/icons/arrowRight.png" alt="." />
							<p>Una hora de ofertas imperdibles</p>
			    		<img src="/images/icons/arrowLeft.png" alt="." />
						</div>
						<div className="theVideo">
							<iframe width="1090" height="613" src="https://www.youtube.com/embed/3Qp3kSpKrpM"></iframe>
						</div>
		      	<div className="footerVideo dNone dLgFlex dRowCenter">
		      		<img src="/images/footerVideo.png" alt="." />
		      	</div>
					</div>
					<div className="contact textCenter">
						<div className="titleContact dRowCenter">
			      	<img src="/images/icons/lightning.png" alt="." />
			      	<p>Ofertas disponibles hasta el xx de noviembre</p>
						</div>
						<p>¿Te interesa?</p>
						<div className="btnContact dRowCenter">
							<Button type="primary" href="https://d4webs.com" target="_blank">
			      		<img src="/images/icons/mail.png" alt="." />
					      Consultá por mail
					    </Button>
					    <Button type="primary" href="https://d4webs.com" target="_blank">
			      		<img src="/images/icons/whatsapp.png" alt="." />
					      Consultá por WhatsApp
					    </Button>
						</div>
					</div>
				</Col>
			</Row>
			<style jsx global>{`
				.OpenDayLanding{
			    background: #3A4145;
    			position: relative;
    			z-index: 0;
				}
				.OpenDayLanding p, .OpenDayLanding span{
			    color: #fff;
			    margin: 0;
					font-weight: 900;
					font-size: 4vw;
					line-height: 5vw;
				}
				.OpenDayContainer {
			    display: grid;
			    grid-template-columns: 1fr;
			    padding-bottom: 10px!important;
				}
				.OpenDayLanding .title img{
					max-width: 50%;
    			margin-bottom: 3vh;
				}
				.OpenDayLanding .secondParagraph{
					font-weight: 400;
					margin-top: 20px;
				}
				.OpenDayLanding .theVideo{
					padding-top: 56.26%;
					position: relative;
					width: 100%;
    			margin: 4vh 0;
				}
				.OpenDayLanding .theVideo iframe {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.OpenDayLanding .titleContact img {
				  height: 4vw;
				  margin-right: 5px;
				}
				.OpenDayLanding .contact > p {
				  font-weight: 400;
				}
				.OpenDayLanding .btnContact{
					justify-content: space-around;
				}
				.OpenDayLanding .btnContact .ant-btn{
					margin: 5vh 0;
					background: #1baae4;
					border-color: #1baae4;
					padding: 0 7px;
				}
				.OpenDayLanding .btnContact .ant-btn:last-child{
					background: #31b744;
					border-color: #31b744;
				}
				.OpenDayLanding .btnContact .ant-btn span {
					font-size: 3vw;
				}
				.OpenDayLanding .btnContact .ant-btn img {
			    height: 2.5vw;
			    transform: translateY(-2px);
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.OpenDayLanding p, .OpenDayLanding span{
						font-size: 3vw;
						line-height: 3.5vw;
					}
					.OpenDayLanding .btnContact .ant-btn span {
						font-size: 2vw;
						padding: 0 7px 15px;
					}
					.OpenDayLanding .btnContact .ant-btn img {
				    height: 20px;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
					.OpenDayLanding .btnContact .ant-btn span{
						font-size: 14px;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.OpenDayContainer {
				    padding-bottom: 100px!important;
					}
					.OpenDayLanding .lineLeft{
						display: block;
						position: absolute;
						top: 120px;
						left: 0;
						width: 20%;
					}
					.OpenDayLanding .lineRight{
						display: block;
						position: absolute;
						bottom: 30px;
						right: 0;
						width: 20%;
					}
					.OpenDayLanding p, .OpenDayLanding span {
					  font-size: 20px;
					  line-height: 24px;
					}
					.OpenDayContainer {
				    display: grid;
				    grid-template-columns: 48% 48%;
				    grid-column-gap: 4%;				    
					}
					.OpenDayLanding .title img{
						transform: translateX(-15px);
					}
					.OpenDayContainer .title {
						grid-column-start: 1;
						grid-column-end: 2;
						grid-row-start: 1;
						grid-row-end: 2;
					}
					.OpenDayContainer .viewVideo {
						grid-column-start: 2;
						grid-column-end: 3;
						grid-row-start: 1;
						grid-row-end: 3;
					}
					.OpenDayContainer .contact {
						grid-column-start: 1;
						grid-column-end: 2;
						grid-row-start: 2;
						grid-row-end: 3;
						margin-top: 30px;
					}
					.OpenDayContainer .textCenter{
						text-align: left;
					}
					.OpenDayLanding .titleContact img {
					  height: 30px;
					}
					.OpenDayLanding .theVideo{
	    			margin: 15px 0;
					}
					.OpenDayLanding .footerVideo{
						justify-content: flex-end;
					}
					.OpenDayLanding .footerVideo img{
						width: 50%;
					}
					.OpenDayLanding .titleContact{
						justify-content: flex-start;
					}
					.OpenDayLanding .titleVideo img {
					  width: auto;
					  height: 32px;
					}
					.OpenDayLanding .titleVideo p {
					  font-size: 26px;
					  margin: 1vh 20px;
					  text-align: center;
					}
				}
				@media (min-width: ${theme.breakPoints.xl}){
					.OpenDayContainer {
				    display: grid;
				    grid-template-columns: 44% 48%;
				    grid-column-gap: 8%;				    
					}
					.OpenDayLanding .btnContact{
						justify-content: flex-start;
					}
					.OpenDayLanding .btnContact .ant-btn:first-child {
					  margin-right: 15px;
					}
					.OpenDayLanding .btnContact .ant-btn img {
						height: 20px;
					  margin-right: 5px;
					}
					OpenDayLanding .btnContact .ant-btn span {
						font-size: 16px;
					}
				}
			`}</style>
		</React.Fragment>
	)
}