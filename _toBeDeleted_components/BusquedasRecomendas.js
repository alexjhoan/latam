import Link from "next/link";
import BusquedasRecomendasStyles from "../styles/components/BusquedasRecomendas";
import {gql} from "@apollo/client";
import { useQuery } from "@apollo/client";
import ImagenOptimizada from "./ImagenOptimizada";

const QUERY_RECOMENDADAS = gql`
  query FeaturedSearches {
    featuredSearches {
      title
      url
      image
    }
  }
`;

export default function BusquedasRecomendas() {
  const { data, loading, error } = useQuery(QUERY_RECOMENDADAS);
  if (error) return null;
  if (loading) return null;
  if (data.featuredSearches.length < 0) return null;

  return (
    <React.Fragment>
      <div className="BusquedasRecomendas">
        <div className="title">
          <div className="layout-container">
            <i className="icon-heart" />
            <h2>Búsquedas Recomendadas</h2>
          </div>
        </div>
        <div className="layout-container">
          <div className="recomendadas-container">
            {data.featuredSearches.map(function(item, i) {
              return (
                <a
                  className="recomendada"
                  title={item.title}
                  href={item.url}
                  key={"recomendada_" + i}
                >
                  <ImagenOptimizada src={item.image} alt={item.title} />
                  <div className="overLay" />
                  <div className="text">
                    <i className="icon-heart" />
                    <span>{item.title}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{BusquedasRecomendasStyles}</style>
    </React.Fragment>
  );
}
