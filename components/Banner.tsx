import React from "react";
import {useTheme} from "../shared-components/Styles/ThemeHook";
import {Row, Col, Typography, Divider, Statistic} from "antd";
import { Pie } from 'react-chartjs-2';
import Fade from 'react-reveal/Fade';
import CountUp from 'react-countup';
import Lottie from 'react-lottie';
import * as animationReloj from './animations/reloj/data.json'
import * as animationLatAm from './animations/logo-latam/data.json'
import * as animationFire from './animations/fire/data.json'
import * as animationComments from './animations/comments/data.json'

const randomNumber = (min:number, max:number) => {
	let num = Math.round((Math.random() * (max - min)) + min);
	return num
}

export default function Banner() {
	const [countFire, setCountFire] = React.useState(randomNumber(325, 632))
	const [countComment, setCountComment] = React.useState(randomNumber(102, 215))
	const {theme} = useTheme();
	const {Title, Text} = Typography;
	const {Countdown} = Statistic;
	const deadline = Date.parse("11/10/2020");
	const today = Date.now();
	const init = Date.parse("11/04/2020");
	const amountChange = randomNumber(1, 5)
	const prob = randomNumber(1, 3)

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

	const onFinish = () => {
		console.log("onFinished")
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

	const numero = () => {
		if (prob === 1) {
			setCountFire(countFire - amountChange)
			setCountComment(countComment - amountChange)
		} else {
			setCountFire(countFire + amountChange)
			setCountComment(countComment - amountChange)
		}
	}

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationReloj.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const LatAmOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationLatAm.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const fireOptions = {
    loop: true,
    autoplay: true,
    animationData: animationFire.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const CommentsOptions = {
    loop: true,
    autoplay: true,
    animationData: animationComments.default,
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
								<div className="containerAnimation">
									<Lottie options={LatAmOptions} height={150}/>
								</div>
							</Fade>
						</Col>
						<Col xs={24} md={12}>
							<Fade right>
								<p className="titleDate"><span>Del 4 al 10 de noviembre</span></p>
								<p className="subTitle">
									Ofertas exclusivas y oportunidades de inversión en Uruguay y
									Paraguay por tiempo limitado
								</p>
							</Fade>
						</Col>
					</Row>
					<Row className="CountersLanding">
						<Col xs={24} lg={8} className="dColumnCenter counterContainer">
							<p className="titleCounter">
								Tiempo para comprar con descuentos:
							</p>
							<div className="dRowCenter">
								<div className="img-HourGlass">
									<Lottie options={defaultOptions}/>
								</div>
								<div className="timeCounter">
									{counter}
									<div className="textCounter">
										<span>días</span>
										<span>horas</span>
										<span>minutos</span>
										<span>segundos</span>
									</div>
								</div>
							</div>
						</Col>
						<Divider type={"horizontal"} className="lgHidden" />
						<Col xs={24} lg={8} className="CounterDivider dColumnCenter">
							<p className="titleCounter">¿Qué está pasando en la sala?</p>
							<div className="visitorCounter">
								<div className="innerText">
									<div className="imgInner">
										<div className="animationContent">
											<Lottie options={fireOptions} height={25} width={30}/>
										</div>
										<p className="titleCounter"><CountUp end={countFire} duration={1} /></p>
									</div>
									<span>
										inversores nos han visitado en las últimas 6 horas
									</span>
								</div>
								<div className="innerText">
									<div className="imgInner">
										<div className="animationContent">
											<Lottie options={CommentsOptions} height={25} width={30}/>
										</div>
										<p className="titleCounter"><CountUp end={countComment} duration={1} /></p>
									</div>
									<span>personas están consultando ahora</span>
								</div>
							</div>
						</Col>
						<Divider type={"horizontal"} className="lgHidden" />
						<Col xs={24} lg={8} className="dColumnCenter metricsContainer">
						<p className="titleCounter">¿De dónde nos visitan?</p>
							<div className="graficCounter">
								<div className="imgGrafic">
									<Pie data={pieData} options={pieOptions}/>
								</div>
								<div className="textGrafic dColumnCenter">
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
				.BannerLanding .InfBanner span, .BannerLanding .InfBanner p {
					color: #fff;
					font-weight: 900;
					font-size: 1.3rem;
					text-align: center;
					line-height: 1.5rem;
					margin-top: 5vh;
				}
				.BannerLanding .InfBanner .titleDate {
					text-align: center;
					margin: 0;
				}
				.BannerLanding .InfBanner .titleDate span{
					border: solid 2px #fff;
					margin-top: 0;
					padding: 10px;
				}
				.BannerLanding .InfBanner p.subTitle {
					font-weight: 900;
					text-align: center;
				}
				.CountersLanding {
					background: #fff;
					padding: 4vw;
					border-radius: 20px;
					box-shadow: 0px 5px 8px #0000009f;
				}
				.CountersLanding .ant-statistic-content {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}
				.CountersLanding .counterContainer, .CountersLanding .CounterDivider, .CountersLanding .metricsContainer{
					justify-content: flex-start;
				}
				.CountersLanding .img-HourGlass img {
					max-width: 100%;
				}
				.CountersLanding .img-HourGlass {
					width: 12vw;
					margin-right: 2vw;
					margin-top: 5px;
				}
				.CountersLanding p.titleCounter {
					margin: 0;
					font-weight: 900;
					font-size: 14px;
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
				}
				.CountersLanding .innerText {
					font-size: 12px;
					line-height: 13px;
					width: 100%;
				}
				.CountersLanding .visitorCounter,
				.CountersLanding .sumaryGrafic {
					display: grid;
					grid-template-columns: 46% 46%;
					grid-column-gap: 8%;
					margin: 10px 8% 0 10%;
				}
				.CountersLanding .sumaryGrafic {
					grid-template-columns: 48% 48%;
					grid-column-gap: 4%;
					margin: 10px 8% 0 20%;
				}
				.CountersLanding .graficCounter {
					display: grid;
					grid-template-columns: 30% 70%;
					height: 100%;
					width: 100%;
					max-width: 350px;
				}
				.CountersLanding .graficCounter .textGrafic{
					width: 100%;
				}
				.CountersLanding .graficCounter .imgGrafic {
					margin: 0 -20px;
				}
				.CountersLanding .graficCounter img {
					width: 100%;
					max-width: 70px;
					height: auto;
				}
				.CountersLanding .imgInner {
					display: flex;
					flex-direction: row;
				}
				.CountersLanding .imgInner .animationContent {
					transform: translateY(-8px);
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
					.BannerLanding .InfBanner span {
						font-size: 1.5rem;
					}
					.CountersLanding span.ant-statistic-content-value {
						font-size: 40px;
						line-height: 40px;
					}
					.CountersLanding p.titleCounter {
						font-size: 16px;
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
					.BannerLanding .InfBanner .titleDate {
						text-align: left;
					}
					.BannerLanding .InfBanner p.subTitle {
						text-align: left;
					}
					.BannerLanding .CountersLanding {
						padding: 20px;
					}
					.BannerLanding .InfBanner span {
						text-align: left;
					}
					.CountersLanding .img-HourGlass {
						width: 8vw;
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
					  font-size: 15px;
					  line-height: 15px;
					  margin-bottom: 5px;
					}
					.CountersLanding span.ant-statistic-content-value {
						font-size: 30px;
						line-height: 30px;
					}
					.CountersLanding .textCounter {
						font-size: 12px;
					}
					.CountersLanding .innerText {
						font-size: 14px;
						line-height: 15px;
					}
				}
				@media (min-width: ${theme.breakPoints.xl}) {
					.CountersLanding p.titleCounter {
					  font-size: 17px;
					  line-height: 17px;
					}
				}
			`}</style>
		</React.Fragment>
	);
}
