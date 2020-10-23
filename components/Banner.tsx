import React from 'react'
import { useTheme } from "../shared-components/Styles/ThemeHook";
import {Row, Col, Typography, Divider, Statistic} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";


export default function Banner() {
	const { theme } = useTheme();
	const { Title, Text } = Typography;
	const screen = useBreakpoint();
	const { Countdown } = Statistic;
	const deadline = Date.parse("11/04/2020");

	function onFinish() {
	  console.log('finished!');
	}

	return (
		<React.Fragment>
			<Row className="BannerLanding">
				<Col xs={24} className="BannerContainer">
					<Row className="InfBanner">
						<Col xs={24} md={12} className="imgContainer">
	      			<img src="/images/latam.png" alt="." />
						</Col>
						<Col xs={24} md={12}>
							<Title>Del 4 al 10 de noviembre</Title>
							<Title>Ofertas exclusivas y oportunidades de inversión en Uruguay y Paraguay por tiempo limitado</Title>
						</Col>
					</Row>
					<Row className="CountersLanding">
						<Col xs={24} lg={8} className="timeDescounts">
							<div className="img-HourGlass">
	      				<img src="/images/icons/HourGlass.png" alt="." />
							</div>
							<div className="timeCounter">
								<p className="titleCounter">Tiempo para comprar con descuentos:</p>
								<Countdown value={deadline} onFinish={onFinish} format="D : HH : mm : ss"/>
								<div className="textCounter">
									<span>días</span>
									<span>horas</span>
									<span>minutos</span>
									<span>segundos</span>
								</div>
							</div>
						</Col>
	    			<Divider type={"horizontal"} className="lgHidden"/>
						<Col xs={24} lg={8} className="CounterDivider">
							<p className="titleCounter">¿Qué está pasando en la sala?</p>
							<div className="visitorCounter">
								<div className="innerText">
									<div className="imgInner">
			      				<img src="/images/icons/fire.png" alt="." />
									</div>
									<p className="titleCounter">XXXX</p>
									<span>inversores nos han visitado en las últimas 6 horas</span>
								</div>
								<div className="innerText">
									<div className="imgInner">
			      				<img src="/images/icons/comment.png" alt="." />
									</div>
									<p className="titleCounter">XXXX</p>
									<span>están consultando ahora</span>
								</div>
							</div>
						</Col>
	    			<Divider type={"horizontal"} className="lgHidden"/>
						<Col xs={24} lg={8}>
							<div className="graficCounter">
								<div className="imgGrafic">
		      				<img src="/images/icons/HourGlass.png" alt="." />
								</div>
							{/* TODO: buscar la grafica del banner */}
								<div className="textGrafic">
									<p className="titleCounter">¿De dónde nos visitan?</p>
									<div className="sumaryGrafic innerText">
										<span>Argentina</span>
										<span>Paraguay</span>
										<span>Uruguay</span>
										<span>Otros</span>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
			<style jsx global>{`
				.BannerLanding{
					background-image: url(/images/header.jpg);
					background-repeat: no-repeat;
			    background-size: cover;
			    background-position: top center;
				}
				.BannerLanding .BannerContainer{
					max-width: 90%;
					margin: 0 auto;
					padding: 5vh 15px;
				}
				.BannerLanding .InfBanner .imgContainer, .BannerLanding .imgGrafic {
					display: flex;
			    flex-direction: row;
			    justify-content: center;
			    align-items: center;
				}
				.BannerLanding .InfBanner .imgContainer img {
					width: 400px;
					max-width: 100%;
				}
				.BannerLanding .InfBanner .ant-typography{
					color: #fff;
					font-weight: 100;
			    font-size: 1.3rem;
			    text-align: center;
			    line-height: 1.8rem;
			    margin-top: 5vh;
				}
				.BannerLanding .InfBanner .ant-typography + h1.ant-typography{
					font-weight: 800;
					margin-top: 0;
					text-align: left;
				}
				.CountersLanding {
			    background: #fff;
			    padding: 4vw;
			    border-radius: 20px;
			    box-shadow: 0px 5px 8px #0000009f;
				}
				.CountersLanding .timeDescounts, .CountersLanding .ant-statistic-content {
			    display: flex;
			    flex-direction: row;
			    align-items: center;
			    justify-content: center;
				}
				.CountersLanding .img-HourGlass img {
					max-width: 100%;
				}
				.CountersLanding .img-HourGlass {
			    width: 10vw;
			    margin-right: 2vw;
				}
				.CountersLanding p.titleCounter {
			    margin: 0;
			    font-weight: 900;
			    font-size: 3.3vw;
				}
				.CountersLanding span.ant-statistic-content-value {
			    font-size: 8vw;
			    line-height: 8vw;
			    font-weight: 900;
				}
				.CountersLanding .textCounter {
			    display: flex;
			    flex-direction: row;
			    justify-content: space-between;
			    font-size: 2.5vw;
			    padding-left: 6vw;
				}
				.CountersLanding .innerText {
					font-size: 2.5vw;
				}
				.CountersLanding .visitorCounter, .CountersLanding .sumaryGrafic {
			    display: grid;
			    grid-template-columns: 1fr 1fr;
			    grid-column-gap: 10px;
			    margin-top: 10px;
				}
				.CountersLanding .graficCounter {
			    display: grid;
			    grid-template-columns: 35% 65%;
				}
				.CountersLanding .graficCounter img{
					width: 100%;
					max-width: 70px;
					height: auto;					
				}
				.CountersLanding .innerText {
			    padding-left: 15px;
			    position: relative;
				}
				.CountersLanding .imgInner {
			    position: absolute;
			    left: -7px;
			    top: -1px;
				}
				.CountersLanding .imgInner img {
			    height: 20px;
			    width: auto;
				}

				@media (min-width: ${theme.breakPoints.sm}){
					.BannerLanding .InfBanner .ant-typography{
				    font-size: 1.5rem;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
					.BannerLanding .imgContainer, .BannerLanding .imgContainer + .ant-col {
				    padding: 0 15px;
					}
					.BannerLanding .CountersLanding {
						padding: 20px;
					}
					.BannerLanding .InfBanner .ant-typography{
				    text-align: left;
					}
					.CountersLanding .img-HourGlass {
				    width: 5vw;
				    margin-right: 15px;
				    max-width: 70px;
					}
					.CountersLanding p.titleCounter {
				    font-size: 2.5vw;
					}
					.CountersLanding span.ant-statistic-content-value {
		        font-size: 5vw;
    				line-height: 5vw;
					}
					.CountersLanding .textCounter {
				    font-size: 2vw;
    				padding-left: 7vw;
    				padding-right: 1vw;
					}
					.CountersLanding .innerText {
						font-size: 2vw;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.BannerLanding .BannerContainer{
						max-width: 80%;
					}
					.CountersLanding .CounterDivider{
						border-left: solid 1px #0000000f;
						border-right: solid 1px #0000000f;
						padding: 0 1vw;
					}
					.lgHidden{
						display: none;
					}
					.CountersLanding .img-HourGlass {
				    width: 3vw;
				    margin-right: 7px;
				    max-width: 70px;
					}
					.CountersLanding p.titleCounter {
				    font-size: 1.1vw;
					}
					.CountersLanding span.ant-statistic-content-value {
		        font-size: 2.4vw;
    				line-height: 2.4vw;
					}
					.CountersLanding .textCounter {
				    font-size: 1vw;
    				padding-left: 2vw;
					}
					.CountersLanding .innerText {
						font-size: 1vw;
					}
				}
			`}</style>			
		</React.Fragment>
	)
}