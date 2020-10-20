import AboutUsStyles from "../styles/components/AboutUs.js";
import React, { useState } from "react";
import {gql} from "@apollo/client";
import Loader from "./Loader.js";
import { useQuery } from "react-apollo";
import Console from "../lib/console";
import ImagenOptimizada from "./ImagenOptimizada";

import { handleApolloError } from "../lib/apollo";
const AboutUs = (props) => {
  const [open, changeAreaOpen] = useState("portal");

  const { data, loading, error } = useQuery(gql`
    query Countries {
      countries {
        id
        name
        data {
          country_flag
          main_domain
        }
      }
    }
  `);
  if (error) {
    if (handleApolloError(error)) return null;
  }

  if (loading)
    return (
      <div style={{ padding: "40px 0px" }}>
        <Loader height="30px" width="30px" />
      </div>
    );

  const areas = {
    portal: {
      id: "portal",
      title: "Portal & Apps",
      image:
        "https://cdn1.infocasas.com.uy/web/5ee782fe76cf6_infocdn__portal_apps.png",
      description:
        "Portal multiplataforma con tecnología avanzada de búsqueda y funcionalidades únicas para inmobiliarias, propietarios y usuarios. Contamos con más de 150.000 propiedades publicadas y 60.000 descargas de nuestras aplicaciones móviles.",
      extraImages: [
        {
          image:
            "https://cdn2.infocasas.com.uy/web/5ee372edae68f_infocdn__app@2x.png",
          title: "Apps",
        },
        {
          image:
            "https://cdn2.infocasas.com.uy/web/5e8b905da033d_infocdn__appstore.png",
          link: "https://itunes.apple.com/uy/app/infocasas/id1126880888?mt=8",
          title: "Apple App Store",
        },
        {
          image:
            "https://cdn2.infocasas.com.uy/web/5e8b905da2050_infocdn__googleplay.png",
          link:
            "https://play.google.com/store/apps/details?id=uy.com.infocasas.infoapp",
          title: "Play Store",
        },
      ],
      paises: [1, 2, 3, 4, 5],
    },
    agencia: {
      id: "agencia",
      title: "Agencia",
      image:
        "https://cdn2.infocasas.com.uy/web/5a206d6591063_infocdn__596663f424e26_infocdn__qs_agencia-min.png",
      description:
        "Somos la única agencia digital especializada en Real Estate de LatAm. Desarrollamos estrategias de comunicación y soluciones tecnológicas a medida (Apps, Diseño Web, Social Media, Campañas Digitales y más) para empresas afines al rubro inmobiliario que deseen aumentar sus resultados.",
      paises: [1, 2, 3, 4, 5],
    },
    bigData: {
      id: "bigData",
      title: "Big Data",
      image:
        "https://cdn2.infocasas.com.uy/web/5c2d13fd3258c_infocdn__bigdata-min.png",
      description:
        "Tenemos acceso a un enorme caudal de datos y métricas en tiempo real acerca del comportamiento del mercado. Esto nos permite desarrollar informes y herramientas para ayudar a nuestros clientes a tomar las mejores decisiones.",
      paises: [1, 2, 3, 4, 5],
    },
    revista: {
      id: "revista",
      title: "Revista",
      image:
        "https://cdn2.infocasas.com.uy/web/59725bf563aac_infocdn__qs-revista-min.png",
      description:
        "Revista impresa y digital con un alcance de 320.000 lectores. Apuntamos a la máxima calidad de diseño e impresión, presentes con nuestras tres ediciones en puntos de distribución estratégicos de las principales ciudades de Uruguay, Paraguay y Bolivia.",
      paises: [1, 2, 5],
    },
  };

  return (
    <React.Fragment>
      <div className="AboutUs">
        <div className="layout-container">
          <h2>Quiénes somos</h2>
          <div className="about-container">
            <div className="contentBlock">
              <ImagenOptimizada
                className="logoQuienes"
                src="https://cdn2.infocasas.com.uy/web/5ee3722bdec05_infocdn__logo-infocasas@2x.png"
                alt="InfoCasas"
              />
              <p className="textoQ">
                Somos una empresa joven e innovadora que brinda soluciones
                integrales a quienes buscan y publican propiedades para venta,
                compra o alquiler. Nuestro foco está en desarrollar herramientas
                y tecnología con gran usabilidad para la industria inmobiliaria
                a nivel regional.
              </p>
              <div className="menuQuienes">
                {Object.keys(areas).map(function(area) {
                  return (
                    <div
                      key={"area_" + areas[area].title}
                      className={area === open ? "open_btn active" : "open_btn"}
                      onClick={() => {
                        changeAreaOpen(area);
                      }}
                    >
                      <span>{areas[area].title}</span>
                      <i
                        className={
                          area === open ? "icon-right-open" : "icon-angle-down"
                        }
                      ></i>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="contentQuienesSection"
              key={"about_us_area" + areas[open]["id"]}
            >
              <h3 className="tituloSectionQuienes">{areas[open]["title"]}</h3>
              <ImagenOptimizada
                src={areas[open]["image"]}
                alt={areas[open]["title"]}
                className="imgContentQuienes"
              />
              <p>{areas[open]["description"]}</p>
              {typeof areas[open]["extraImages"] != "undefined" ? (
                <div className="extraLinks">
                  {areas[open]["extraImages"].map(function(extra, i) {
                    return (
                      <a href={extra.link} key={"extras_ " + i}>
                        <ImagenOptimizada src={extra.image} alt={extra.title} />
                      </a>
                    );
                  })}
                </div>
              ) : null}

              <div className="banderas">
                {data.countries.map((country) => {
                  if (!country.data) {
                    return null;
                  }

                  return (
                    <a
                      href={"https://" + country.data.main_domain}
                      key={"banderas_ " + country.name + "_" + country.id}
                    >
                      <ImagenOptimizada
                        src={country.data.country_flag}
                        alt={country.name}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{AboutUsStyles}</style>
    </React.Fragment>
  );
};

export default AboutUs;
