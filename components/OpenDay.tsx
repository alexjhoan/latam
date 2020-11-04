import React from 'react'
import {Row, Col, Button} from "antd";
import Fade from 'react-reveal/Fade';
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
							<p>Precios 10% por debajo del mercado</p>
			    		<img src="/images/icons/arrowLeft.png" alt="." />
						</div>
						<div className="theVideo">
							<iframe width="1090" height="613" src="https://www.youtube.com/watch?v=nsxkaLVzJEY"></iframe>
						</div>
		      	<div className="footerVideo dNone dLgFlex dRowCenter">
		      		<Fade right>
		      			<img src="/images/footerVideo.png" alt="." />
		      		</Fade>
		      	</div>
					</div>
					<div className="contact textCenter">
						<div className="titleContact dRowCenter">
			      	<p><img src="/images/icons/Lightning.png" alt="." />Ofertas disponibles hasta el 10 de noviembre</p>
						</div>
						<p>¿Te interesa?</p>
						<div className="btnContact dColumnCenter">
							<Button type="primary" href="https://www.infocasas.com.uy/proyectos/form/latam-invierte/amp2" target="_blank">
			      		<img src="/images/icons/mail.png" alt="." />
					      Consultá por mail
					    </Button>
					    <Button type="primary" href="https://api.whatsapp.com/send?phone=59897134559&text=Quiero%20m%C3%A1s%20informaci%C3%B3n%20de%20los%20proyectos%20en%20lanzamiento" target="_blank">
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
					font-size: 18px;
					line-height: 18px;
				}
				.OpenDayContainer {
			    display: grid;
			    grid-template-columns: 1fr;
			    padding-bottom: 15px!important;
				}
				.OpenDayLanding .title img{
					max-width: 50%;
    			margin-bottom: 3vh;
				}
				.OpenDayLanding .secondParagraph{
					font-weight: 400;
					margin-top: 20px;
					font-size: 15px;
					line-height: 17px;
				}
				.OpenDayLanding .theVideo{
					padding-top: 56.26%;
					position: relative;
					width: 100%;
    			margin: 4vh 0;
				}
				#__next .OpenDayLanding .theVideo iframe {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: block!important;
				}
				.OpenDayLanding .titleContact img {
				  height: 20px;
				  margin-right: 5px;
				}
				.OpenDayLanding .contact > p {
				  font-weight: 400;
				  margin-top: 10px;
				}
				.OpenDayLanding .btnContact .ant-btn{
					margin: 10px 0 5px;
					background: #1baae4;
					border-color: #1baae4;
					padding: 0 7px;
					min-width: 216px;
				}
				.OpenDayLanding .btnContact .ant-btn:last-child{
					background: #31b744;
					border-color: #31b744;
				}
				.OpenDayLanding .btnContact .ant-btn span {
					font-size: 15px;
				}
				.OpenDayLanding .btnContact .ant-btn img {
			    height: 20px;
			    transform: translateY(-2px);
			    margin-right: 5px;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.OpenDayLanding .btnContact{
						justify-content: space-around;
						flex-direction: row;
					}
					.btnContact a:first-child {
					  margin-right: 10px!important;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
					.OpenDayContainer {
				    padding-bottom: 30px!important;
					}
					.OpenDayLanding p, .OpenDayLanding span {
					  font-size: 22px;
					  line-height: 22px;
					}
					.OpenDayLanding .secondParagraph {
					  font-size: 18px;
					  line-height: 20px;
					}
					.OpenDayLanding .btnContact .ant-btn span{
						font-size: 16px;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.OpenDayContainer {
				    padding-bottom: 60px!important;
				    padding-top: 20px!important;
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
					  font-size: 22px;
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
				}
			`}</style>
		</React.Fragment>
	)
}