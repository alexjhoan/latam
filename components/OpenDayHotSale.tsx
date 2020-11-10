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
					<Row className="rowVideos">
						<Col xs={24} className="viewVideo dColumnCenter">
							<div className="imgVideo dRowCenter">
								<img src="/images/hotSale.png" alt="." />
							</div>
							<div className="titleVideo dRowCenter">
				    		<img src="/images/icons/arrowRight.png" alt="." />
								<p>Ofertas de último momento</p>
				    		<img src="/images/icons/arrowLeft.png" alt="." />
							</div>
							<div className="theVideo">
								<iframe width="1090" height="613" rel="0" src="https://www.youtube.com/embed/uiMagm1lRcs"></iframe>
							</div>
						</Col>
						<Col xs={24} className="viewVideo dColumnCenter">
							<div className="imgVideo dRowCenter">
	      				<img src="/images/openDay.png" alt="." />
	      			</div>
							<div className="titleVideo dRowCenter">
				    		<img src="/images/icons/arrowRight.png" alt="." />
								<p>Precios 10% por debajo del mercado</p>
				    		<img src="/images/icons/arrowLeft.png" alt="." />
							</div>
							<div className="theVideo">
								<iframe width="1090" height="613" rel="0" src="https://www.youtube.com/embed/nsxkaLVzJEY"></iframe>
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs={24} className="contact dColumnCenter">
							<div className="titleContact dRowCenter">
				      	<p><img src="/images/icons/Lightning.png" alt="." />Ofertas disponibles hasta el 12 de noviembre</p>
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
						</Col>
					</Row>
					<Row>
						<Col xs={24} className="footerOpenDay dColumnCenter">
							<div className="footerTel">
								<Fade left>
					      	<div className="containerTel">
				      			<p>Consulta al</p>
				      			<p className="telNumber">+598 97 134 559</p>
				      		</div>
								</Fade>
							</div>
							<div className="footerImg dRowCenter">
								<Fade right>
			      			<img src="/images/footerVideo.png" alt="." />
			      		</Fade>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
			<style jsx global>{`
				.OpenDayLanding{
			    background: #3A4145;
    			position: relative;
    			z-index: 0;
				}
				.OpenDayLanding .OpenDayContainer {
				  padding-bottom: 40px;
				}
				.OpenDayLanding p, .OpenDayLanding span{
			    color: #fff;
			    margin: 0;
					font-weight: 900;
					font-size: 18px;
					line-height: 18px;
				}
				.OpenDayLanding .imgVideo img{
					max-width: 50%;
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
				.OpenDayLanding .theVideo{
					padding-top: 56.26%;
					position: relative;
					width: 100%;
    			margin: 15px 0 50px;
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
					margin-top: 3vh;
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
				.OpenDayLanding .titleVideo {
				  margin: 15px 0 0;
				}
				.OpenDayLanding .titleVideo img {
				  width: auto;
				  height: 20px;
				}
				.OpenDayLanding .titleVideo p {
				  margin: 0 10px;
				  text-align: center;
				}
				.OpenDayLanding .footerOpenDay .footerImg img {
					width: 50%;
				}
				.OpenDayLanding .footerOpenDay .footerTel {
					margin: 15px 0;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.OpenDayLanding .titleVideo p {
					  font-size: 28px;
					}
					.OpenDayLanding .btnContact{
						justify-content: space-around;
						flex-direction: row;
					}
					.btnContact a:first-child {
					  margin-right: 10px!important;
					}
					.OpenDayLanding .imgVideo img{
						max-width: 40%;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
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
					.OpenDayLanding .OpenDayContainer {
					  padding-bottom: 70px;
					}
					.OpenDayLanding .rowVideos {
						display: grid;
				    grid-template-columns: 48% 48%;
				    grid-column-gap: 4%;
					}
					.OpenDayLanding .imgVideo {
						align-items: flex-end;
	    			margin-bottom: 2vh;
	    			height: 10vw;
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
					.OpenDayLanding .imgVideo img{
						max-width: 50%;
					}
					.OpenDayLanding p, .OpenDayLanding span {
					  font-size: 20px;
					  line-height: 24px;
					}
					.OpenDayLanding .title img{
						transform: translateX(-15px);
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
					  height: 24px;
					}
					.OpenDayLanding .titleVideo p {
					  font-size: 22px;
					  text-align: center;
					}
					.OpenDayLanding .containerTel p {
					  font-size: 28px;
					}
					.OpenDayLanding .containerTel p.telNumber {
					  font-size: 34px!important;
					}
					.OpenDayLanding .footerOpenDay {
					  display: grid;
					  grid-template-columns: 48% 48%;
					  grid-column-gap: 4%;
					  margin-top: 30px;
					}
					.OpenDayLanding .footerOpenDay .footerTel {
						display: flex;
				    flex-direction: row;
				    justify-content: flex-end;
					}
					.OpenDayLanding .footerOpenDay .footerImg {
						justify-content: flex-start;
					}
				}
				@media (min-width: ${theme.breakPoints.xl}){
					.OpenDayLanding .titleVideo p {
					  font-size: 22px;
					}
					.OpenDayLanding .titleVideo img {
					  height: 28px;
					}
					.OpenDayLanding .btnContact{
						justify-content: flex-start;
					}
					.OpenDayLanding .btnContact .ant-btn:first-child {
					  margin-right: 40px!important;
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