import React from 'react'
import {Row, Col } from "antd";
import { useTheme } from "../shared-components/Styles/ThemeHook";
import { useTranslation } from "react-i18next";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function BigData() {
	const screen = useBreakpoint();
	const { theme } = useTheme();
	const { t } = useTranslation();
	return (
		<React.Fragment>
			<Row id="bigdata" className="BigDataLanding">
				<Col xs={24} className="containerLanding">
					<div className="boxTitle dColumnCenter">
						<h1 className="title">{t("Big Data")}</h1>
						<h1 className="title">{t("Conocé más de Uruguay y Paraguay en números")}</h1>
					</div>
					<div className="containerImg">
						<div className="boxImg">
							<img src="/images/informe-rentabilidad-py.jpg" alt="" />
							<p className="titleImg">{t("Informe de Rentabilidad")}</p>
							<p className="SubTitleImg">{t("Paraguay 2020")}</p>
						</div>	
						<div className="boxImg">
							<img src="/images/informe-rentabilidad-uy.jpg" alt="" />
							<p className="titleImg">{t("Informe de Rentabilidad")}</p>
							<p className="SubTitleImg">{t("Paraguay 2020")}</p>
						</div>
					</div>
				</Col>
			</Row>
			<style jsx global>{`
				.BigDataLanding .containerLanding {
					background: #f1f1f1;
					width: 100%;
					flex: 0 0 100%;
					padding-bottom: 80px;
					max-width: none;
				}
				.BigDataLanding .containerLanding > div{
					width: 90%;
					flex: 0 0 90%;
					margin: 0 auto;
					max-width: 1400px;
				}
				.BigDataLanding .boxTitle {
					padding: 30px 0 50px;
				}
				.BigDataLanding h1.title, .BigDataLanding .boxImg p {
			    text-align: center;
			    font-weight: 900;
			    font-size: 18px;
			    line-height: 18px;
			    margin-bottom: 0;
				}
				.BigDataLanding h1.title + h1{
			    font-weight: 400;
				}
				.BigDataLanding .containerImg{
					display: grid;
				  grid-template-columns: 1fr;
				  grid-gap: 30px;
				  margin: 7vh 0;
				}
				.BigDataLanding .boxImg p{
					color: ${theme.colors.primaryColor};
					text-align: left;
				}
				.BigDataLanding .boxImg img {
				  max-width: 100%;
				  margin-bottom: 3vh;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.BigDataLanding h1.title, .BigDataLanding .boxImg p {
						font-size: 24px;
						line-height: 24px;
					}
				}
				@media (min-width: ${theme.breakPoints.md}){
					.BigDataLanding .containerImg{
					  grid-template-columns: 1fr 1fr;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.BigDataLanding h1.title, .BigDataLanding .boxImg p {
						font-size: 26px;
						line-height: 26px;
					}
				}
				@media (min-width: ${theme.breakPoints.xxl}){
					.BigDataLanding .containerLanding > div{
						width: 80%;
						flex: 0 0 80%;
					}
				}
			`}</style>
		</React.Fragment>
	)
}