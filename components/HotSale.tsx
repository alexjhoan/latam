import React from 'react'
import {Row, Col, Button} from "antd";
import { Typography } from 'antd';
import Fade from 'react-reveal/Fade';
import { useTheme } from "../shared-components/Styles/ThemeHook";

export default function OpenDay() {
	const { Title } = Typography;
	const { theme } = useTheme();

	return (
		<div className='containerHotSale'>
			<Row className="containerLanding dMdNone">
				<Col xs={24} className='dRowCenter'>
					<img src="/images/hotSale.png" alt="hotSale" className='imgHotSale'/>
				</Col>
			</Row>
			<div className='containerDesktop'>
				<Row className="containerLanding">
					<Col xs={24} md={12} className='containerImgHot dNone dMdFlex'>
						<img src="/images/hotSale.png" alt="hotSale" className='imgHotSale'/>
					</Col>
					<Col xs={24} md={12}>
						<div className="containerText">
							<span className='title'>¡Registrate al evento de cierre con ofertas de último momento!</span>
							<span className='meetDay'>Martes 20 de abril</span>
							<span className='meetHour'>11hs<img src="/images/icons/zoom.png" alt="zoom" className='imgZoom'/>vía zoom</span>
							<div className="singUp">
								<Button type="primary">
									Registrarme
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</div>
			<style jsx>{`
				.containerHotSale :global(.containerLanding){
					padding: 0;
					margin: 0 auto;
					width: 100%;
				}
				.imgHotSale {
					max-width: 100%;
					max-height: 330px;
				}
				.containerText {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 50px 15px;
					height: 100%;
				}
				.containerText :global(>*) {
					margin: 7px 0;
				}
				.title {
					color: #fff;
					font-size: 19px;
					font-weight: 700;
					text-align: center;
					line-height: 1.4;
				}
				.meetDay {
					background-color: #efbb40;
					color: #3a4145;
					padding: 6px 20px;
					border-radius: 10px;
					font-size: 21px;
					font-weight: 600;
				}
				.meetHour{
					color: #fff;
					font-size: 21px;
				}
				.imgZoom {
					width: 25px;
					margin: 0 5px;
				}
				.singUp :global(.ant-btn) {
					padding: 5px 30px;
					font-size: 21px;
					height: auto;
				}
				.containerDesktop {
					background-color: #3a4145;
				}
				.containerDesktop :global(.containerImgHot) {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: flex-end;
					padding: 0 16px;
				}
				
				@media (min-width: ${theme.breakPoints.sm}){
					
				}
				@media (min-width: ${theme.breakPoints.md}){
					.containerText {
						align-items: flex-start;
					}
					.title {
						text-align: left;
						font-size: 22px;
					}
					.meetDay {
						font-size: 24px;
					}
					.meetHour{
						font-size: 24px;
					}
					.imgZoom {
						width: 25px;
						margin: 0 5px;
					}
					.singUp :global(.ant-btn) {
						font-size: 24px;
					}
				}
				@media (min-width: ${theme.breakPoints.xxl}){
					.title {
						text-align: left;
						font-size: 28px;
					}
					.meetDay {
						font-size: 28px;
					}
					.meetHour{
						font-size: 28px;
					}
					.imgZoom {
						width: 30px;
						margin: 0 5px;
					}
					.singUp :global(.ant-btn) {
						font-size: 28px;
					}
				}
			`}</style>
		</div>
	)
}