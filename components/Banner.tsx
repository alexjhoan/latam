import React from "react";
import {useTheme} from "../shared-components/Styles/ThemeHook";
import {Row, Col, Typography, Divider, Statistic} from "antd";
import { Pie } from 'react-chartjs-2';
import Fade from 'react-reveal/Fade';
import CountUp from 'react-countup';
import Lottie from 'react-lottie';
import * as animationReloj from './reloj/data.json'

export default function Banner() {
	const {theme} = useTheme();
	const {Title, Text} = Typography;
	const {Countdown} = Statistic;
	const deadline = Date.parse("11/10/2020");
	const today = Date.now();
	const init = Date.parse("11/04/2020");

	const pieData = {
		labels: [
      "Argentina",
      "Paraguay",
      "Uruguay",
      "Otros"
    ],
    datasets: [
    	{
	      data: [55, 28, 15, 2],
	      backgroundColor: [
	        "#61b3cb",
	        "#C02721",
	        "#2e2c99",
	        "#ffae2b"
	    	]
    	}
  	]
	}

	const pieOptions = {
	  legend: {
	    display: false
	  },
	  animation: {
	  	animateRotate: true,
	  	animateScale: true
	  }
	};

	function onFinish() {
		console.log("finished!");
	}

	let counter: any;
	if (today > init) {
		counter = (
			<Countdown
				value={deadline}
				onFinish={onFinish}
				format="D : HH : mm : ss"
			/>
		);
	} else {
		counter = (<Statistic value={"7 : 00 : 00 : 00"} />);
	}

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationReloj.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

	return (
		<React.Fragment>
			<Row className="BannerLanding">
				<Col xs={24} className="containerLanding">
					<Row className="InfBanner">
						<Col xs={24} md={12} className="imgContainer dColumnCenter">
							<Fade left>
								<img src="/images/latam.png" alt="." />
							</Fade>
						</Col>
						<Col xs={24} md={12}>
							<Fade right>
								<Title className="titleDate">Del 4 al 10 de noviembre</Title>
								<Title>
									Ofertas exclusivas y oportunidades de inversión en Uruguay y
									Paraguay por tiempo limitado
								</Title>
							</Fade>
						</Col>
					</Row>
					<Row className="CountersLanding">
						<Col xs={24} lg={8} className="timeDescounts">
							<div className="img-HourGlass">
								<Lottie options={defaultOptions} />
							</div>
							<div className="timeCounter">
								<p className="titleCounter">
									Tiempo para comprar con descuentos:
								</p>
								{counter}
								<div className="textCounter">
									<span>días</span>
									<span>horas</span>
									<span>minutos</span>
									<span>segundos</span>
								</div>
							</div>
						</Col>
						<Divider type={"horizontal"} className="lgHidden" />
						<Col xs={24} lg={8} className="CounterDivider dColumnCenter">
							<p className="titleCounter">¿Qué está pasando en la sala?</p>
							<div className="visitorCounter">
								<div className="innerText">
									<div className="imgInner">
										<img src="/images/icons/fire.png" alt="." />
									</div>
									<p className="titleCounter"><CountUp end={385} duration={3} /></p>
									<span>
										inversores nos han visitado en las últimas 6 horas
									</span>
								</div>
								<div className="innerText">
									<div className="imgInner">
										<img src="/images/icons/comment.png" alt="." />
									</div>
									<p className="titleCounter"><CountUp end={423} duration={3} /></p>
									<span>están consultando ahora</span>
								</div>
							</div>
						</Col>
						<Divider type={"horizontal"} className="lgHidden" />
						<Col xs={24} lg={8}>
							<div className="graficCounter">
								<div className="imgGrafic">
									<Pie data={pieData} options={pieOptions}/>
								</div>
								<div className="textGrafic">
									<p className="titleCounter">¿De dónde nos visitan?</p>
									<div className="sumaryGrafic innerText">
										<span><span className="colorGraph"></span>Argentina</span>
										<span><span className="colorGraph"></span>Paraguay</span>
										<span><span className="colorGraph"></span>Uruguay</span>
										<span><span className="colorGraph"></span>Otros</span>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
			<style jsx global>{`
				.BannerLanding > .containerLanding {
				  margin: 5vh auto;
				}
				.BannerLanding {
					background-image: url(/images/header.jpg);
					background-repeat: no-repeat;
					background-size: cover;
					background-position: top center;
					position: relative;
    			z-index: 1;
				}
				.BannerLanding .InfBanner {
					margin: -50px 0 5vh;
					padding-top: 60px;
				}
				.BannerLanding .InfBanner .imgContainer,
				.BannerLanding .imgGrafic {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
				}
				.BannerLanding .InfBanner .imgContainer img {
					width: 300px;
					max-width: 100%;
				}
				.BannerLanding .InfBanner .ant-typography {
					color: #fff;
					font-weight: 900;
					font-size: 1.3rem;
					text-align: center;
					line-height: 1.5rem;
					margin-top: 5vh;
				}
				.BannerLanding .InfBanner .titleDate {
					border: solid 2px #fff;
					margin-top: 0;
					padding: 10px;
				}
				.BannerLanding .InfBanner .ant-typography + h1.ant-typography {
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
				.CountersLanding .timeDescounts,
				.CountersLanding .ant-statistic-content {
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
					font-size: 12px;
					line-height: 13px;
				}
				.CountersLanding .visitorCounter,
				.CountersLanding .sumaryGrafic {
					display: grid;
					grid-template-columns: 1fr 1fr;
					grid-column-gap: 10px;
					margin-top: 10px;
				}
				.CountersLanding .graficCounter {
					display: grid;
					grid-template-columns: 30% 70%;
					height: 100%;
				}
				.CountersLanding .graficCounter img {
					width: 100%;
					max-width: 70px;
					height: auto;
				}
				.CountersLanding .innerText {
					padding-left: 25px;
					position: relative;
				}
				.CountersLanding .imgInner {
					position: absolute;
					left: 0px;
					top: 1px;
				}
				.CountersLanding .imgInner img {
					height: 20px;
					width: auto;
				}
				.CountersLanding .innerText span:not(.colorGraph) {
				  position: relative;
				}
				.CountersLanding .innerText span.colorGraph {
			    position: absolute;
			    height: 8px;
			    width: 8px;
			    border-radius: 100%;
			    top: 1px;
			    left: -15px;
				}
				.CountersLanding .innerText span:first-child .colorGraph{
					background: #61b3cb;
				}
				.CountersLanding .innerText span:nth-child(2) .colorGraph{
					background: #C02721;
				}
				.CountersLanding .innerText span:nth-child(3) .colorGraph{
					background: #2e2c99;
				}
				.CountersLanding .innerText span:last-child .colorGraph{
					background: #ffae2b;
				}
				@media (min-width: ${theme.breakPoints.sm}) {
					.BannerLanding .InfBanner .ant-typography {
						font-size: 1.5rem;
					}
					.CountersLanding .innerText {
						font-size: 15px;
						line-height: 18px;
					}
					.CountersLanding .graficCounter {
						display: grid;
						grid-template-columns: 40% 60%;
						height: 100%;
					}
					.CountersLanding .innerText span.colorGraph {
				    top: 4px;
					}
				}
				@media (min-width: ${theme.breakPoints.md}) {
					.BannerLanding .imgContainer,
					.BannerLanding .imgContainer + .ant-col {
						padding: 0 15px;
					}
					.BannerLanding .CountersLanding {
						padding: 20px;
					}
					.BannerLanding .InfBanner .ant-typography {
						text-align: left;
					}
					.CountersLanding .img-HourGlass {
						width: 5vw;
						margin-right: 15px;
						max-width: 70px;
					}
					.CountersLanding p.titleCounter {
						font-size: 22px;
					}
					.CountersLanding span.ant-statistic-content-value {
						font-size: 40px;
						line-height: 40px;
					}
					.CountersLanding .textCounter {
						font-size: 18px;
						padding-left: 7vw;
						padding-right: 1vw;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}) {
					.CountersLanding .CounterDivider {
						border-left: solid 1px #0000000f;
						border-right: solid 1px #0000000f;
						padding: 0 1vw;
					}
					.lgHidden {
						display: none;
					}
					.CountersLanding .img-HourGlass {
						width: 4vw;
						max-width: 70px;
					}
					.CountersLanding p.titleCounter {
					  font-size: 16px;
					  line-height: 16px;
					  margin-bottom: 5px;
					}
					.CountersLanding span.ant-statistic-content-value {
						font-size: 35px;
						line-height: 35px;
					}
					.CountersLanding .textCounter {
						font-size: 14px;
						padding-left: 2vw;
					}
					.CountersLanding .innerText {
						font-size: 14px;
						line-height: 15px;
						padding-left: 10px;
					}
					.CountersLanding .imgInner {
						position: absolute;
						left: -10px;
						top: -1px;
					}
				}
				@media (min-width: ${theme.breakPoints.xl}) {
					.CountersLanding .textCounter {
					  padding-left: 3vw;
					}
				}
			`}</style>
		</React.Fragment>
	);
}
