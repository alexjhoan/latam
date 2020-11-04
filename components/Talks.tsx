import React from 'react'
import {Row, Col} from "antd";
import { useTheme } from "../shared-components/Styles/ThemeHook";
import { useTranslation } from "react-i18next";
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { SwiperSlide } from 'swiper/react'
import Swiper from 'react-id-swiper'
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const dataVideo = [
	{
		title: 'Bienvenida LatAm Invierte',
		subTitle: '¿Cómo funciona?',
		idVideo: '7Ls7pAoaQGQ'
	}
]

export default function Talks() {
	const { theme } = useTheme();
	const { t } = useTranslation();

  const dataVideoImp = dataVideo.map((a, i) => {
    return(
      <SwiperSlide key={i}>
        <div className="itemVideo">
					<iframe src={`https://www.youtube.com/embed/${a.idVideo}`}></iframe>
				</div>
				{/*<p>{a.title}</p>
				<p>{a.subTitle}</p>*/}
      </SwiperSlide>
    )
  })

  const paramsSwiper = {
    spaceBetween: 10,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    },
  }

	return (
		<React.Fragment>
			<Row id="talks" className="TalksLanding">
				<Col xs={24} className="containerLanding">
					<div>
						<h1 className="titleTalks">{t('Charlas y presentaciones de proyectos')}</h1>
						<Swiper {...paramsSwiper}>
							{dataVideoImp}
						</Swiper>						
					</div>
				</Col>
			</Row>
			<style jsx global>{`
				.TalksLanding .containerLanding {
					background: #f1f1f1;
					width: 100%;
					flex: 0 0 100%;
					max-width: none;
				}
				.TalksLanding .containerLanding > div{
					width: 90%;
					flex: 0 0 90%;
					margin: 0 auto;
					max-width: 1400px;
					padding-bottom: 60px;
				}
				.TalksLanding .titleTalks {
					font-size: 18px;
					text-align: center;
					margin-bottom: 3vh;
  				font-weight: 900;
  				line-height: 18px;
  				padding-top: 60px;
				}
				.TalksLanding .itemVideo{
					padding-top: 56.26%;
					position: relative;
					width: 100%;
					margin-bottom: 15px;
				}
				#__next .TalksLanding .itemVideo iframe {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: block!important;
				}
				.TalksLanding .itemVideo ~ p {
				  line-height: 22px;
				  margin-bottom: 0;
				  font-size: 20px;
				  font-weight: 900;
				}
				.TalksLanding .swiper-button-next, .TalksLanding .swiper-button-prev {
					top: 51%;
			    background: #ffffff8c;
			    padding: 0;
			    border-radius: 100%;
			    box-shadow: 3px 3px 3px #0000006f;
			    transition: ease-in-out .3s;
			    height: 28px;
				}
				.TalksLanding .swiper-button-next:hover, .TalksLanding .swiper-button-prev:hover {
					background: #ffffff;
					transition: ease-in-out .3s;
				}
				.TalksLanding .swiper-button-next:after, .TalksLanding .swiper-button-prev:after {
					font-size: 15px;
					color: ${theme.colors.textColor};
					font-weight: 900;
				}
				@media (min-width: ${theme.breakPoints.sm}){
					.TalksLanding .titleTalks {
						font-size: 3vw;
					}
				}
				@media (min-width: ${theme.breakPoints.lg}){
					.TalksLanding .titleTalks {
						font-size: 28px;
						padding: 30px 0 0;
						text-align: center;
						margin-bottom: 5vh;
    				font-weight: 900;
					}
				}
				@media (min-width: ${theme.breakPoints.xxl}){
					.TalksLanding .containerLanding > div{
						width: 80%;
						flex: 0 0 80%;
					}
				}
			`}</style>
		</React.Fragment>
	)
}