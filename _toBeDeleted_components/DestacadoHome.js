import DestacadoHomeStyle from "../styles/components/DestacadoHome.js";
import {gql} from "@apollo/client";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  QUERY_OPERATION,
  TYPENAME_BUSCADOR_PROPIEDADES,
} from "../shared-components/ApolloResolvers/BuscadorPropiedades";
import { handleApolloError } from "../lib/apollo";
import ImagenOptimizada from "./ImagenOptimizada";

const QUERY_DESTACADO_HOME = gql`
  query DestacadoHome($operation_type_id: Int) {
    featuredBannerHome(operationType: $operation_type_id) {
      active
      created_at
      deleted_at
      url
      html_logo
      id
      image
      logo
      logo_bg_color
      logo_mobile
      logo_mobile_width
      logo_text_color
      operation_type_id
      logo_width
      name
      probability
    }
  }
`;

let fetchPolicy = "cache-first";
const DestacadoHome = () => {
  const BUSCADOR_PROPIEDADES = useQuery(QUERY_OPERATION);
  if (BUSCADOR_PROPIEDADES.loading) return null;
  const [operation_type_id, setOperationTypeId] = useState(
    BUSCADOR_PROPIEDADES.data[TYPENAME_BUSCADOR_PROPIEDADES].operacion[0]
  );

  const { data, loading, error } = useQuery(QUERY_DESTACADO_HOME, {
    variables: {
      operation_type_id: operation_type_id,
    },
    fetchPolicy: fetchPolicy,
  });

  useEffect(() => {
    fetchPolicy = "no-cache";
  }, []);

  if (
    operation_type_id !==
    BUSCADOR_PROPIEDADES.data[TYPENAME_BUSCADOR_PROPIEDADES].operacion[0]
  ) {
    setOperationTypeId(
      BUSCADOR_PROPIEDADES.data[TYPENAME_BUSCADOR_PROPIEDADES].operacion[0]
    );
  }

  if (loading) return null;

  let d;
  if (
    error ||
    (data &&
      (typeof data.featuredBannerHome == "undefined" ||
        data.featuredBannerHome == null))
  ) {
    if (error) handleApolloError(error);
    d = {
      id: "00",
      name: "default",
      image:
        "https://cdn2.infocasas.com.uy/web/5786707324f50_infocdn__home30-opti.jpg",
    };
  } else {
    d = data.featuredBannerHome;
  }

  return (
    <div
      className={
        "destacadoHome" + (error ? " ERROR_LOADING_DESTACADO_HOME" : "")
      }
      key={"destacado_home_" + d.id}
    >
      <ImagenOptimizada src={d.image} className="background" alt={d.name} />
      <div className="overLay" />

      {typeof d.url != "undefined" ? (
        <div className="background-container">
          <a
            className="background-logo css-display-f"
            href={d.url}
            target="_blank"
          >
            <picture>
              <source
                media="(max-width: 980px)"
                srcSet={
                  typeof d.logo_mobile != "undefined" ? d.logo_mobile : d.logo
                }
              />
              <ImagenOptimizada src={d.logo} alt={d.name} className="logo" />
            </picture>

            <div className="text">
              <span
                className="logo-text"
                dangerouslySetInnerHTML={{ __html: d.html_logo }}
              />
              <span className="logo-name">{d.name} </span>
            </div>
            <div className="ver">
              <span>Conocé Más</span>
              <i className="icon-plus" />
            </div>
          </a>
        </div>
      ) : null}
      <style jsx>{`
        .destacadoHome :global(.background-logo) {
          background-color: ${d.logo_bg_color};
        }
        .destacadoHome :global(.background-logo .text) {
          color: ${d.logo_text_color};
        }
        .destacadoHome :global(.background-logo .ver) {
          color: ${d.logo_text_color};
          border: ${"solid 1px " + d.logo_text_color};
          background: transparent;
        }
        .destacadoHome :global(.background-logo .ver:hover) {
          color: ${d.logo_bg_color};
          background: ${d.logo_text_color};
        }

        .destacadoHome :global(.background-logo .logo) {
          max-width: ${typeof d.logo_width != "undefined"
          ? d.logo_width
          : "183"}px !important;
        }
        .destacadoHome :global(.background-logo picture) {
          max-width: ${typeof d.logo_width != "undefined"
          ? d.logo_width
          : "183"}px !important;
        }
        @media screen and (max-width: 980px) {
          .destacadoHome :global(.background-logo .logo) {
            max-width: ${typeof d.logo_mobile_width != "undefined"
          ? d.logo_mobile_width
          : "185"}px !important;
          }
          .destacadoHome :global(.background-logo picture) {
            max-width: ${typeof d.logo_mobile_width != "undefined"
          ? d.logo_mobile_width
          : "185"}px !important;
          }
        }
      `}</style>
      <style jsx>{DestacadoHomeStyle}</style>
    </div>
  );
};

export default DestacadoHome;
