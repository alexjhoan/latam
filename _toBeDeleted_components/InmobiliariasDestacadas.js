import InmobiliariasDestacadasStyles from "../styles/components/InmobiliariasDestacadas.js";
import Slider from "react-slick";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { handleApolloError } from "../lib/apollo";
import ImagenOptimizada from "./ImagenOptimizada";

const INMO_QUERY = gql`
	query PremiumRealAgents {
		realEstateAgents(premium_agents: true) {
			id
			logo
			name
			profile_url
		}
	}
`;

function NextArrow({ className, style, onClick }) {
	return (
		<div className="carrouselArrow right" onClick={onClick}>
			<i className="icon-angle-right" />
		</div>
	);
}

function PrevArrow({ className, style, onClick }) {
	return (
		<div className="carrouselArrow left" onClick={onClick}>
			<i className="icon-angle-left" />
		</div>
	);
}
const InmobiliariasDestacada = props => {
	const { data, loading, error } = useQuery(INMO_QUERY);
	if (error) {
		if (handleApolloError(error)) return null;
	}
	if (loading) return null;
	let inmobiliarias =
		data && data.realEstateAgents ? data.realEstateAgents : [];
	if (inmobiliarias.length < 4) return null;

	const listItems = inmobiliarias.map((inmobiliaria, i) => (
		<div className="inmoLogo" key={"inmo" + inmobiliaria.id + "_" + i}>
			<a href={inmobiliaria.profile_url} target="_blank">
				<ImagenOptimizada src={inmobiliaria.logo} />
			</a>
		</div>
	));

	const [settings, setSettings] = useState({
		dots: false,
		arrows: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		infinite: inmobiliarias.length > 6,
		speed: 400,
		autoplaySpeed: 5500,
		autoplay: true,
		slidesToScroll: 2,
		slidesToShow: 6,
		render: true,
	});

	useEffect(() => {
		setSettings({
			...settings,
			render: false,
			responsive: [
				{
					breakpoint: 10000,
					settings: {
						slidesToShow: 6,
					},
				},
				{
					breakpoint: 980,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 2,
						infinite: inmobiliarias.length > 5,
					},
				},
				{
					breakpoint: 680,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: inmobiliarias.length > 2,
					},
				},
			],
		});
	}, []);

	useEffect(() => {
		if (!settings.render) {
			setSettings({ ...settings, render: true });
		}
	}, [settings.render]);

	return (
		<React.Fragment>
			<div className="InmobiliariasDestacadas" ref={props.refInmo}>
				<div className="layout-container">
					{settings.render && <Slider {...settings}>{listItems}</Slider>}
				</div>
			</div>
			<style jsx>{InmobiliariasDestacadasStyles}</style>
		</React.Fragment>
	);
};

export default InmobiliariasDestacada;
