import React from 'react'
import {SearchResultsCards} from '../shared-components/ViewFragments/SearchResults/Content/SearchResultsCards/web'
import {Row, Col, Button} from "antd";
import { useTheme } from "../shared-components/Styles/ThemeHook";
import { useTranslation } from "react-i18next";

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

export default function Properties() {
	const { theme } = useTheme();
	const { t } = useTranslation();
	return (
		<React.Fragment>
			<Row id="properties" className="propertiesLanding">
				<Col xs={24} className="containerLanding">
					<img src="/images/banner-props.png" alt="." className="img-banner"/>
					<div className="containerProps">
						<div className="itemProps dColumnCenter">
							<img src="/images/uy.jpg" alt="."/>
							<div className="detailsItem dColumnCenter">
								<Button type="primary">{t("Ver propiedades")}</Button>
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
							<img src="/images/py.jpg" alt="."/>
							<div className="detailsItem dColumnCenter">
								<Button type="primary">{t("Ver propiedades")}</Button>
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
				@media (min-width: ${theme.breakPoints.xxl}){
					.propertiesLanding .detailsItem {
						width: 60%;
					}
				}
			`}</style>
		</React.Fragment>
	)
}