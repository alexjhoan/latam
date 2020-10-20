import LinkBoxesStyles from "../styles/components/LinkBoxes.js";
import LinkBox from "./LinkBox";
import ImagenOptimizada from "./ImagenOptimizada";
import {gql} from "@apollo/client";
import { useQuery } from "@apollo/client";
import { handleApolloError } from "../lib/apollo";

const SEOLINKS_QUERY = gql`
  query SEO {
    seoLinks {
      category
      img
      links {
        title
        url
      }
    }
  }
`;
export default function LinkBoxes() {
  const { data, loading, error } = useQuery(SEOLINKS_QUERY);

  if (loading) return null;
  if (error) {
    if (handleApolloError(error)) return null;
  }

  return (
    <React.Fragment>
      <section className="LinkBoxes">
        <div className="layout-container">
          <ImagenOptimizada
            className={"img"}
            src={
              "https://cdn2.infocasas.com.uy/web/59774fa84ea01_infocdn__idea_opti.png"
            }
          />
          <h2>También te puede interesar</h2>
          <div className="LinkBoxesContainer">
            {data.seoLinks.map((category, index) => {
              return category.links.length === 0 ? null : (
                <LinkBox
                  key={index}
                  slug={category.category
                    .toLowerCase()
                    .split(" ")
                    .join("-")}
                  nombre={category.category}
                  imagen={category.img}
                  links={category.links}
                />
              );
            })}
          </div>
        </div>
      </section>
      <style jsx>{LinkBoxesStyles}</style>
    </React.Fragment>
  );
}
