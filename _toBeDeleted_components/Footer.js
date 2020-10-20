import FooterStyles from "../styles/components/Footer.js";
import FormNewsletterSubscriber from "./FormNewsletterSubscriber.js";
import { useQuery } from "react-apollo";
import {gql} from "@apollo/client";
import Loader from "./Loader.js";
import ImagenOptimizada from "./ImagenOptimizada.js";
import getConfig from "next/config";

const {
  NODE_ENV,
  APP_NAME,
  APP_VERSION
} = getConfig().publicRuntimeConfig;


const COUNTRIES_QUERY = gql`
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
`;
const COUNTRY_QUERY = gql`
  query Country {
    configuration {
      country_id
      socialMediaLinks {
        name
        slug
        url
        icon
      }
    }
  }
`;
const display_countries = [1, 2, 3, 4, 5];
const Links = [
  { nombre: "Inicio", link: "/portada" },
  { nombre: "Revista", link: "/revista" },
  { nombre: "Blog", link: "/blog" },
  { nombre: "Directorio Inmobiliario", link: "/inmobiliarias" },
  { nombre: "FAQs", link: "/faq" },
  { nombre: "Términos y Condiciones", link: "/faq#boxtc" },
];
export default function Footer() {
  const { data, loading, error } = useQuery(COUNTRIES_QUERY);
  const { data: country, loading: load, error: err } = useQuery(COUNTRY_QUERY);
  if (err || error) return null;
  if (load || loading) {
    return (
      <footer>
        <div className="layout-container" style={{ padding: "20px 0px" }}>
          <Loader width="30px" height="30px" />
        </div>
      </footer>
    );
  }

  return (
    <React.Fragment>
      <footer>
        <div className="layout-container">
          <div className="col4">
            <div className="promoAppiOS">
              <span className="mtitle">
                ¡Descargá gratis la app de InfoCasas!
              </span>
              <div>
                <i className="ctrans" title={ APP_NAME + "-" + APP_VERSION + "-" + NODE_ENV}></i>
                <div className="contBtns">
                  <a href="https://itunes.apple.com/uy/app/infocasas/id1126880888?mt=8">
                    <ImagenOptimizada
                      src="https://cdn2.infocasas.com.uy/web/5e8b905da033d_infocdn__appstore.png"
                      alt="Descargar en la App Store"
                    />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=uy.com.infocasas.infoapp">
                    <ImagenOptimizada
                      src="https://cdn2.infocasas.com.uy/web/5e8b905da2050_infocdn__googleplay.png"
                      alt="Descargar en Google Play"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="top">
              <div className="banderas">
                {data.countries.map(function(item, i) {
                  if (!item.data) {
                    return null;
                  }

                  // caso borde: CEEE
                  const formattedName =
                    item.name === "Casas en el Este"
                      ? item.name
                      : "InfoCasas " + item.name;

                  return (
                    <a
                      className="bandera"
                      href={"https://" + item.data.main_domain}
                      title={formattedName}
                      key={"bandera_footer_" + item.id}
                    >
                      <ImagenOptimizada
                        src={item.data.country_flag}
                        alt={formattedName}
                      />
                    </a>
                  );
                })}
              </div>
              {country.configuration.country_id == "1" ? (
                <ImagenOptimizada
                  src="https://cdn2.infocasas.com.uy/web/5bcf6b8a644a4_infocdn__logo-uruguay-natural-portal-ic-min.png"
                  alt="Uruguay Natural"
                  className="uyNatural"
                />
              ) : null}
            </div>
          </div>
          <div className="col4 links">
            <h2>Links</h2>
            <div className="list">
              {Links.map(function(item, i) {
                return (
                  <a href={item.link} title={item.nombre} key={"link_" + i}>
                    {item.nombre}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col4 redes">
            <h2>
              Seguinos
              <br />
              InfoCasas
            </h2>
            <div className="list">
              {country.configuration.socialMediaLinks.map(function(item, i) {
                return (
                  <a
                    className="redes"
                    target="_blank"
                    href={item.url}
                    title={item.name}
                    key={"redes_" + i}
                  >
                    <i className={item.icon}></i>
                    {item.slug}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col4">
            <h2>Suscribite</h2>
            <FormNewsletterSubscriber />
          </div>
        </div>
        <div
          className="goTop"
          title="Ir arriba"
          onClick={(e) => smoothScrollTo(0, 0, 1000)}
        >
          <i className="icon-angle-up"></i>
        </div>
      </footer>
      <style jsx>{FooterStyles}</style>
    </React.Fragment>
  );
}

function smoothScrollTo(endX, endY, duration) {
  var startX = window.scrollX || window.pageXOffset,
    startY = window.scrollY || window.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  // Easing function
  var easeInOutQuart = function(time, from, distance, duration) {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  var timer = window.setInterval(function() {
    var time = new Date().getTime() - startTime,
      newX = easeInOutQuart(time, startX, distanceX, duration),
      newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      window.clearInterval(timer);
    }
    window.scrollTo(newX, newY);
  }, 1000 / 60); // 60 fps
}
