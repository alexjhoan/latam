import React from 'react'
import {Row, Col, Button} from "antd";
import Fade from 'react-reveal/Fade';
import { useTheme } from "../shared-components/Styles/ThemeHook";

export default function OpenDay() {
	const { theme } = useTheme();

	return (
		<React.Fragment>
			<Row id="openday" className="OpenDayLanding">
				<Col xs={24} className="containerLanding OpenDayContainer">
					<div className="dColumnCenter title">
	      		<img src="/images/openDay.png" alt="." />
					</div>
					<div className="viewVideo">
						<div className="titleVideo">
							<p className='title'>Reviví la apertura en vivo de LatAm Invierte</p>
							<p>con siete proyectos con ofertas limitadas presentados por sus desarrolladores. </p>
						</div>
						<p>Un lanzamiento imperdible en Asunción, 4 proyectos con descuentos en Montevideo y un proyecto con descuento en Punta del Este.</p>
						<div className="theVideo">
							<iframe width="1090" height="613" src="https://www.youtube.com/embed/nsxkaLVzJEY"></iframe>
						</div>
					</div>
					<div className="contact">
					<img src="/images/flash.png" alt="." />
						<Button type="primary" href="https://api.whatsapp.com/send?phone=59897134559&text=Quiero%20m%C3%A1s%20informaci%C3%B3n%20de%20los%20proyectos%20en%20lanzamiento" target="_blank">
							<img src="/images/icons/whatsapp.png" alt="." className='iconWhatsapp'/>
							Consultá por WhatsApp
						</Button>
					</div>
				</Col>
			</Row>
			<style jsx global>{`
				.OpenDayLanding{
			    background: #efefef;
    			position: relative;
    			z-index: 0;
				}
				.OpenDayLanding p, .OpenDayLanding span{
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
					max-height: 170px;
				}
				.OpenDayLanding .secondParagraph{
					font-weight: 400;
					margin-top: 20px;
					font-size: 15px;
					line-height: 17px;
				}
				.OpenDayLanding .containerTel {
				  border: solid 2px #fff;
				  padding: 10px;
				  margin-top: 30px;
				}
				.OpenDayLanding .containerTel p {
				  font-size: 24px;
				  text-align: center;
				}
				.OpenDayLanding .containerTel p.telNumber {
				  color: #e8690b!important;
				  font-size: 28px!important;
				  font-weight: 900;
				  margin-top: 10px;
				}
				.OpenDayLanding .viewVideo p {
					text-align: center;
					line-height: 1.3;
					font-size: 16px;
					font-weight: 900;
				}
				.OpenDayLanding .titleVideo {
					margin-bottom: 30px;
				}
				.OpenDayLanding .viewVideo p.title {
					font-size: 22px;
				}
				.OpenDayLanding .titleVideo p:not(.title) {
					font-weight: 500;
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
				.OpenDayLanding .contact {
				  position: relative;
					display: flex;
					flex-direction: row;
					justify-content: center;
				}
				.OpenDayLanding .contact img {
				  max-width: 100%;
					max-height: 350px;
				}
				.OpenDayLanding .contact > p {
				  font-weight: 400;
				  margin-top: 10px;
				}
				.OpenDayLanding .contact .ant-btn{
					margin: 10px 0 5px;
					background: #31b744;
					border-color: #31b744;
					padding: 0 7px;
					position: absolute;
					bottom: 25%;
					left: 33%;
				}
				.OpenDayLanding .contact .ant-btn span {
					font-size: 13px;
				}
				.OpenDayLanding .contact .ant-btn img {
			    height: 20px;
			    transform: translateY(-2px);
			    margin-right: 5px;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.OpenDayLanding .btnContact{
						justify-content: space-around;
						flex-direction: row;
					}
					.OpenDayLanding .viewVideo p {
						font-size: 20px;
					}
					.OpenDayLanding .viewVideo p.title {
						font-size: 30px;
					}
					.OpenDayLanding .contact .ant-btn{
						left: 40%;
						bottom: 35%;
					}
					.OpenDayLanding .contact .ant-btn span {
						font-size: 18px;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
					.OpenDayContainer {
				    padding-bottom: 30px!important;
					}
					.OpenDayLanding .secondParagraph {
					  font-size: 18px;
					  line-height: 20px;
					}
					.OpenDayLanding .btnContact .ant-btn span{
						font-size: 16px;
					}
					.OpenDayLanding .containerTel p {
					  font-size: 28px;
					}
					.OpenDayLanding .containerTel p.telNumber {
					  font-size: 34px!important;
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
						margin-top: 15px;
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
					.OpenDayLanding .viewVideo p {
					  font-size: 19px;
						text-align: left;
					}
					.OpenDayLanding .viewVideo p.title {
						font-size: 28px;
						line-height: 30px;
					}
					.OpenDayLanding .contact .ant-btn{
						left: 40%;
						bottom: 35%;
					}
					.OpenDayLanding .contact .ant-btn span {
						font-size: 18px;
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
					.OpenDayLanding .viewVideo p {
					  font-size: 22px;
					}
					.OpenDayLanding .viewVideo p.title {
						font-size: 28px;
						line-height: 30px;
					}
					.OpenDayLanding .contact .ant-btn{
						left: 40%;
						bottom: 35%;
					}
					.OpenDayLanding .contact .ant-btn span {
						f
				}
			`}</style>
		</React.Fragment>
	)
}