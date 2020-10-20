import React, { useEffect, useState } from "react";
import BannerSubhome from "./BannerSubhome";
import Slider from "react-slick";
import {gql} from "@apollo/client";
import { useQuery } from "@apollo/client";
import { handleApolloError } from "../lib/apollo";

import {
  QUERY_OPERATION,
  TYPENAME_BUSCADOR_PROPIEDADES
} from "../shared-components/ApolloResolvers/BuscadorPropiedades";

const DESTACADO_SUBHOME_QUERY = gql`
  query SubBanners($limit: Int, $operationType: Int) {
    featuredSubBannersHome(limit: $limit, operationType: $operationType) {
      id
      url
      image
      name
      operation_type_id
    }
  }
`;

const SubHome = props => {
  const BUSCADOR_PROPIEDADES = useQuery(QUERY_OPERATION);
  if (BUSCADOR_PROPIEDADES.loading) return null;
  const [operation_type_id, setOperationTypeId] = useState(
    BUSCADOR_PROPIEDADES.data[TYPENAME_BUSCADOR_PROPIEDADES].operacion[0]
  );

  const [fetch_policy, setFetchPolicy] = useState("cache-first");
  const { data, loading, error } = useQuery(DESTACADO_SUBHOME_QUERY, {
    variables: {
      limit: 3,
      operationType: operation_type_id
    },
    fetchPolicy: fetch_policy
  });

  const [settings, setSettings] = useState({
    infinite: true,
    autoplay: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    render: true
  });

  useEffect(() => {
    setSettings({
      ...settings,
      render: false,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    });
  }, []);

  useEffect(() => {
    if (!settings.render) {
      setSettings({ ...settings, render: true });
    }
  }, [settings.render]);

  if (
    operation_type_id !==
    BUSCADOR_PROPIEDADES.data[TYPENAME_BUSCADOR_PROPIEDADES].operacion[0]
  ) {
    setOperationTypeId(
      BUSCADOR_PROPIEDADES.data[TYPENAME_BUSCADOR_PROPIEDADES].operacion[0]
    );
    setFetchPolicy("no-cache");
  }

  if (loading) return null;
  if (error) if (handleApolloError(error)) return null;
  if (data.featuredSubBannersHome.length < 3) return null;

  return (
    <React.Fragment>
      <div
        className="SubHome"
        style={{ padding: "45px 0px" }}
        key={
          "bannerSubhome" +
          data.featuredSubBannersHome.map(banner => "_" + banner.id)
        }
      >
        <div className="layout-container">
          {settings.render && (
            <Slider {...settings}>
              {data.featuredSubBannersHome.map((banner, i) => (
                <BannerSubhome
                  key={banner.id}
                  image={banner.image}
                  link={banner.url}
                  pos={i + 1}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const loader = <div className="SubHome" style={{ padding: "45px 0px" }}></div>;

export default SubHome;
