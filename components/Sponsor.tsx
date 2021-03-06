import React from 'react'
import {Row, Col, Pagination } from "antd";
import { useTheme } from "../shared-components/Styles/ThemeHook";
import { useTranslation } from "react-i18next";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {participants} from "./Sponsor.json"

export default function Sponsor() {
	const screen = useBreakpoint();
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [currentPage, setCurrentPage] = React.useState(1);
	const totalPerPage = !screen.lg ? 5 : 10;

	const participantToShow = participants.slice((currentPage - 1) * totalPerPage, currentPage * totalPerPage);

	let data:any

	if (!screen.lg) {
		data = participantToShow
	} else {
		data = participants
	}

	if (true) {} else {}

	const cardParticipants = data.map((item, i) => {
		let url
		if (item.url === "") {
			url = ""
		} else {
			url = "Ver Empresa"
		}
		return(
			<div className="card" key={i} >
				<div className="logo">
					<img src={`/images/logos/${item.name}.jpg`} alt="" />
				</div>
				<div>
					<p className="name">{item.name}</p>
					<p>{item.email}</p>
					<p>{item.tel}</p>
					<a href={item.url} target="_blank" className='itemLink'>{url}</a>
					<div className="ubication dRowCenter">
						<img src={`/images/flags/${item.ubication}.png`} alt="" />
						<p>{t(item.ubication)}</p>
					</div>
				</div>
			</div>
		)
	})

	return (
		<React.Fragment>
			<Row id="sponsor" className="SponsorLanding">
				<Col xs={24} className="containerLanding">
					{/* <div className="banner dRowCenter">
						<a href="https://www.bbva.com.uy/Inicio/prestamos-hipotecarios?destacadoWI">
							<img src="/images/bbva_gif.gif" alt="bbva" />
						</a>
					</div> */}
					<h1 className="title">{t("Directorio de Empresas Participantes")}</h1>
						<div className="participants">
						 {cardParticipants}
						</div>
						{
							!screen.lg ? 
							<Pagination current={currentPage} total={participants.length} pageSize={totalPerPage} onChange={(page,size)=>setCurrentPage(page)} className="dRowCenter" />
							: null
						}
						{/* <div className="containerLogos">
							<img src="/images/logos.jpg" alt="" className="sponsorLogos" />
						</div> */}
				</Col>
			</Row>
			<style jsx global>{`
				.SponsorLanding h1.title {
			    text-align: center;
			    font-weight: 900;
			    font-size: 18px;
			    line-height: 18px;
			    padding-top: 30px;
				}
				.SponsorLanding .participants {
				  display: grid;
				  grid-template-columns: 1fr;
				  grid-gap: 30px 15px;
				  margin: 7vh 0;
				}
				.SponsorLanding .card {
				  display: grid;
				  grid-template-columns: 30% 68%;
				  grid-column-gap: 2%;
				}
				.SponsorLanding .card .logo img {
					width:100%;
					height auto;
					border: solid 1px #3A4145;
					padding: 10px 0;
				}
				.SponsorLanding .card p {
				  font-size: 15px;
				  margin-bottom: 0;
    			word-break: break-word;
    			line-height: 20px;
				}
				.SponsorLanding .card p.name {
				  font-weight: 900;
				}
				.SponsorLanding .card .itemLink{
					color: #ff6610;
    			text-decoration: underline;
				}
				.SponsorLanding .card .itemLink:hover{
					color: #3A4145;
					text-decoration: underline;
				}
				.SponsorLanding .card .ubication {
				  justify-content: flex-start;
				}
				.SponsorLanding .card .ubication img {
				  width: auto;
				  height: 25px;
				  margin-right: 10px;
				}
				.SponsorLanding .ant-pagination-item, .SponsorLanding .ant-pagination-prev, .SponsorLanding .ant-pagination-next {
					min-width: 25px;
    			height: 25px;
    			line-height: 25px;
    			font-size: 12px;
    			margin-right: 4px;
				}
				.SponsorLanding .sponsorLogos{
					width:100%;
					height: auto;
					margin-top: 30px;
				}
				.SponsorLanding .containerLogos{
					margin: 0 -15px;
				}
				.SponsorLanding .banner{
					margin: 0 -15px;
				}
				.SponsorLanding .banner img{
					width: 100%;
					max-width: 728px;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.SponsorLanding h1.title {
						font-size: 22px;
					}
					.SponsorLanding .ant-pagination-item, .SponsorLanding ant-pagination-prev, .SponsorLanding ant-pagination-next {
						min-width: 40px;
	    			height: 40px;
	    			line-height: 38px;
	    			font-size: 12px;
	    			margin-right: 8px;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.SponsorLanding h1.title {
						font-size: 28px;
					}
					.SponsorLanding .card p {
					  font-size: 16px;
					}
					.SponsorLanding .participants {
					  grid-template-columns: 1fr 1fr;
					}
					.SponsorLanding .containerLogos{
						margin: 0;
					}
					.SponsorLanding .banner{
						margin: 0;
					}
				}
			`}</style>
		</React.Fragment>
	)
}