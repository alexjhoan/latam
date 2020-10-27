import React from 'react'
import {Row, Col, Pagination } from "antd";
import { useTheme } from "../shared-components/Styles/ThemeHook";
import { useTranslation } from "react-i18next";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const participants = [
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Uruguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Paraguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Uruguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Paraguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Uruguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Paraguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Paraguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Uruguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Uruguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Paraguay'
	},
	{
		name: 'Nombre Empresa',
		email: 'empresa@empresa.com',
		tel: '+598 123 456',
		ubication: 'Uruguay'
	},
]

export default function Sponsor() {
	const screen = useBreakpoint();
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [currentPage, setCurrentPage] = React.useState(1);
	const totalPerPage = !screen.md ? 5 : 10;

	const participantToShow = participants.slice((currentPage - 1) * totalPerPage, currentPage * totalPerPage);

	const cardParticipants = participantToShow.map((item, i) => {
		return(
			<div className="card dRowCenter" key={i} >
				<div>
					<p className="name">{item.name}</p>
					<p>{item.email}</p>
					<p>{item.tel}</p>
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
					<h1 className="title">{t("Directorio de Empresas Participantes")}</h1>
					<div className="participants">
					 {cardParticipants}
					</div>
					<Pagination current={currentPage} total={participants.length} pageSize={totalPerPage} onChange={(page,size)=>setCurrentPage(page)} className="dRowCenter" />
				</Col>
			</Row>
			<style jsx global>{`
				.SponsorLanding h1.title {
			    text-align: center;
			    font-weight: 900;
			    font-size: 4vw;
				}
				.SponsorLanding .participants {
				  display: grid;
				  grid-template-columns: 1fr;
				  grid-gap: 30px 15px;
				  margin: 7vh 0;
				}
				.SponsorLanding .card p {
				  font-size: 20px;
				  margin-bottom: 0;
				}
				.SponsorLanding .card p.name {
				  font-weight: 900;
				}
				.SponsorLanding .card .ubication {
				  justify-content: flex-start;
				}
				.SponsorLanding .card img {
				  width: auto;
				  height: 25px;
				  margin-right: 10px;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.SponsorLanding h1.title {
						font-size: 3vw;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.SponsorLanding h1.title {
						font-size: 28px;
					}
					.SponsorLanding .participants {
					  grid-template-columns: 1fr 1fr;
					}
				}
			`}</style>
		</React.Fragment>
	)
}