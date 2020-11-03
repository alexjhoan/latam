import React from 'react'
import {SearchResultsCards} from '../shared-components/ViewFragments/SearchResults/Content/SearchResultsCards/web'
import {Row, Col, Button} from "antd";
import { useTheme } from "../shared-components/Styles/ThemeHook";
import { useTranslation } from "react-i18next";
import Lottie from 'react-lottie';
import { useCountUp } from 'react-countup';
import * as animationBanner from './animations/banner-properties/data.json'

const listUy = [
	"Proyectos de Vivienda Promovida",
	"Fideicomisos al costo",
	"Propiedades usadas y a estrenar",
	"Opciones en los barrios más rentables de Montevideo",
	"Atractivas oportunidades en Punta del Este desde USD 91.400",
]
const listPy = [
	"Proyectos en el centro financiero y comercial de Asunción.",
	"Departamentos y locales comerciales en zonas de gran revalorización desde USD 900/m²",
	"Propuestas de inversión desde USD 12.500."
]

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationBanner.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


export default function Properties() {
	const { theme } = useTheme();
	const { t } = useTranslation();

	const { countUp: countUpUy, start: startUy } = useCountUp({
    end: 300,
    duration: 1.5,
    prefix: "+",
    onReset: () => startUy,
    onEnd: () => setTimeout(startUy, 1000)
  });

  const { countUp: countUpPy, start: startPy } = useCountUp({
    end: 200,
    duration: 1.5,
    prefix: "+",
    onReset: () => startPy,
    onEnd: () => setTimeout(startPy, 1000)
  });
  
	return (
		<React.Fragment>
			<Row id="properties" className="propertiesLanding">
				<Col xs={24} className="containerLanding">
					<Lottie options={defaultOptions} height="auto"/>
					<div className="containerProps">
						<div className="itemProps dColumnCenter">
							<div className="couterPropeties">
								<img src="/images/uy.jpg" alt="."/>
								<div className="textCounter">
									<span>{countUpUy}</span>
									<p className="textOfert">{t("ofertas")}</p>
								</div>
							</div>
							<div className="detailsItem dColumnCenter">
								<Button href="https://www.infocasas.com.uy/evento-latam" target="_blank" type="primary">{t("Ver propiedades")}</Button>
								<div className="listDetails">
									{
										listUy.map((item, i) => {
											return (
												<div className="itemDetail dRowCenter" key={i}>
													<img src="/images/icons/check.png" alt="."/>
													<p>{t(item)}</p>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
						<div className="itemProps dColumnCenter">
							<div className="couterPropeties">
								<img src="/images/py.jpg" alt="."/>
								<div className="textCounter">
									<span>{countUpPy}</span>
									<p className="textOfert">{t("ofertas")}</p>
								</div>
							</div>
							<div className="detailsItem dColumnCenter">
								<Button href="https://www.infocasas.com.py/evento-latam" target="_blank" type="primary">{t("Ver propiedades")}</Button>
								<div className="listDetails">
									{
										listPy.map((item, i) => {
											return (
												<div className="itemDetail dRowCenter" key={i}>
													<img src="/images/icons/check.png" alt="."/>
													<p>{t(item)}</p>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<style jsx global>{`
				.propertiesLanding .img-banner, .propertiesLanding .itemProps img {
				  width: 100%;
				}
				.propertiesLanding .containerProps {
				  display: grid;
				  grid-template-columns: 1fr;
				  grid-gap: 45px 20px;
				  margin-top: 15px;
				}
				.propertiesLanding .couterPropeties {
				  position: relative;
				  width: 100%;
				}
				.propertiesLanding .textCounter {
				  position: absolute;
				  top: 43%;
				  left: 3%;
				}
				.propertiesLanding .couterPropeties span{
					color:#fff;
					font-weight: 900;
					font-size: 7vw;
    			line-height: 6vw;
				}
				.propertiesLanding .couterPropeties p{
					color: #fff;
					font-weight: 900;
					font-size: 5vw;
					line-height: 3vw;
					margin-bottom: 0;
				}
				.propertiesLanding .itemProps {
					justify-content: flex-start;
				}
				.propertiesLanding .detailsItem {
					margin-top: -10px;
				}
				.propertiesLanding .listDetails {
				  margin-top: 20px;
				}
				.propertiesLanding .itemDetail {
				  justify-content: right;
				  position: relative;
				}
				.propertiesLanding .itemDetail img {
				  height: 20px;
				  width: auto;
				  position: absolute;
  				top: 0;
				}
				.propertiesLanding .itemDetail p {
				  margin-bottom: 8px;
				  padding-left: 25px;
				  line-height: 18px;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.propertiesLanding .detailsItem {
						width: 75%;
						margin: -10px auto 0;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
					.propertiesLanding .detailsItem {
						width: 80%;
					}
					.propertiesLanding .containerProps {
					  grid-template-columns: 1fr 1fr;
					}
					.propertiesLanding .couterPropeties span{
						font-size: 3.3vw;
	    			line-height: 3vw;
					}
					.propertiesLanding .couterPropeties p{
						font-size: 2.2vw;
						line-height: 1vw;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.propertiesLanding .detailsItem button {
					  font-size: 20px;
					  height: auto;
					}
					.propertiesLanding .itemDetail p {
				    margin-bottom: 12px;
				    line-height: 22px;
				    font-size: 20px;
					}
				}
				@media (min-width: ${theme.breakPoints.xl}){
					.propertiesLanding .couterPropeties span{
						font-size: 3.1vw;
	    			line-height: 3vw;
					}
					.propertiesLanding .couterPropeties p{
						font-size: 2vw;
						line-height: 1vw;
					}
				}
				@media (min-width: ${theme.breakPoints.xxl}){
					.propertiesLanding .detailsItem {
						width: 60%;
					}
					.propertiesLanding .couterPropeties span{
						font-size: 45px;
	    			line-height: 38px;
					}
					.propertiesLanding .couterPropeties p{
						font-size: 33px;
						line-height: 25px;
					}
				}
			`}</style>
		</React.Fragment>
	)
}