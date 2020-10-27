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
		idVideo: '3Qp3kSpKrpM'
	},
	{
		title: 'Asesoría Fiscal con KMPG',
		subTitle: 'Estreno 05/11 - 10:30 am',
		idVideo: '3Qp3kSpKrpM'
	},
	{
		title: 'Invertir en la Región',
		subTitle: 'Estreno 05/11 - 10:30 am',
		idVideo: '3Qp3kSpKrpM'
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
				<p>{a.title}</p>
				<p>{a.subTitle}</p>
      </SwiperSlide>
    )
  })

  const paramsSwiper = {
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
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
					<h1 className="titleTalks">{t('Charlas y presentaciones de proyectos')}</h1>
					<Swiper {...paramsSwiper}>
						{dataVideoImp}
					</Swiper>
				</Col>
			</Row>
			<style jsx global>{`
				.TalksLanding .titleTalks {
					font-size: 4vw;
					text-align: center;
					margin-bottom: 3vh;
  				font-weight: 900;
				}
				.TalksLanding .itemVideo{
					padding-top: 56.26%;
					position: relative;
					width: 100%;
				}
				.TalksLanding .itemVideo iframe {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.TalksLanding .itemVideo ~ p {
				  line-height: 22px;
				  margin-bottom: 0;
				  font-size: 20px;
				  font-weight: 900;
				}
				.TalksLanding .swiper-button-next, .TalksLanding .swiper-button-prev {
					top: 43%;
			    background: #ffffff8c;
			    padding: 22px;
			    border-radius: 100%;
			    box-shadow: 3px 3px 3px #0000006f;
			    transition: ease-in-out .3s
				}
				.TalksLanding .swiper-button-next:hover, .TalksLanding .swiper-button-prev:hover {
					background: #ffffff;
					transition: ease-in-out .3s;
				}
				.TalksLanding .swiper-button-next:after, .TalksLanding .swiper-button-prev:after {
					font-size: 22px;
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
						text-align: center;
						margin-bottom: 5vh;
    				font-weight: 900;
					}
				}
			`}</style>
		</React.Fragment>
	)
}