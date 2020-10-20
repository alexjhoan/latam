import { NextSeo } from "next-seo";
import { useQuery } from "react-apollo";
import {gql} from "@apollo/client";
import { withRouter } from "next/router";
import getConfig from "next/config";
const { NODE_ENV } = getConfig().publicRuntimeConfig;

const SEO_QUERY = gql`
  query MiConfiguration {
    configuration {
      metadescription
      title
      main_domain
    }
  }
`;

const SeoComponent = ({ router }) => {
  const { data, loading, error } = useQuery(SEO_QUERY);
  let SEOinfo = {
    title: "InfoCasas",
    keywords:
      "Inmuebles, casas, apartamentos, proyectos inmobiliarios, terrenos, campos, oficina, alquiler, venta, revista",
    description:
      "",
    canonical: router.pathname,
    openGraph: {
      url: router.pathname,
      type: "website",
      image:
        "https://cdn2.infocasas.com.uy/web/5ee3722bdec05_infocdn__logo-infocasas@2x.png",
      site_name: "InfoCasas",
    },
    noindex: NODE_ENV !== "production",
  };

  if (!error && !loading) {
    const url = String(
      "https://" + data.configuration.main_domain + router.pathname
    ).replace(/\/$/, "");
    SEOinfo["title"] = data.configuration.title;
    SEOinfo["metadescription"] = data.configuration.metadescription;
    SEOinfo["canonical"] = url;
    SEOinfo.openGraph["url"] = url;
  }

  return <NextSeo {...SEOinfo} />;
};

export default withRouter(SeoComponent);
