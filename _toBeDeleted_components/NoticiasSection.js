import NoticiasSectionStyles from "../styles/components/NoticiasSection.js";
import Slider from "react-slick";
import Noticia from "./Noticia";
import Loader from "./Loader.js";
import {gql} from "@apollo/client";
import { useQuery } from "@apollo/client";
import { handleApolloError } from "../lib/apollo";

const NOTICIAS_QUERY = gql`
  query Noticias {
    blogPosts(first: 6, home: true) {
      data {
        id
        title
        slug
        description
        created
        image
        tags {
          slug
          url
        }
      }
    }
  }
`;

function NextArrow({ onClick }) {
  return (
    <div className="carrouselArrow right" onClick={onClick}>
      <i className="icon-angle-right"></i>
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div className="carrouselArrow left" onClick={onClick}>
      <i className="icon-angle-left"></i>
    </div>
  );
}

const NoticiasSection = () => {
  const { data, loading, error } = useQuery(NOTICIAS_QUERY);
  if (error) {
    if (handleApolloError(error)) return null;
  }
  if (loading)
    return (
      <React.Fragment>
        <div className="NoticiasSection">
          <div
            className="layout-container"
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              paddingBottom: "50px"
            }}
          >
            <Loader width="30px" height="30px" />
          </div>
        </div>
      </React.Fragment>
    );

  if (!data.blogPosts.data || data.blogPosts.data.length < 3) return null;

  const settings = {
    dots: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: data.blogPosts.data.length > 3,
    speed: 400,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <React.Fragment>
      <div className="NoticiasSection">
        <div className="layout-container">
          <h2>
            <a href="/blog">Noticias </a>
          </h2>

          <div className="SliderContainer">
            <Slider {...settings}>
              {data.blogPosts.data.map((noticia, i) => (
                <Noticia noticia={noticia} key={"noticia_" + noticia.id} />
              ))}
            </Slider>
          </div>
          <a href="/blog" className="boton">
            Ver más noticias en el blog
          </a>
        </div>
      </div>
      <style jsx>{NoticiasSectionStyles}</style>
    </React.Fragment>
  );
};

export default NoticiasSection;
