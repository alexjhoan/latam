import TagManager from "react-gtm-module";
import { useQuery } from "@apollo/client";
import {gql} from "@apollo/client";
import {handleApolloError} from "../lib/apollo";

const IS_BROWSER = typeof window !== "undefined";
const CRITEO_QUERY = gql`
  query GTM_ID {
    configuration {
      google_tag_manager_id
    }
  }
`;
const ME_QUERY = gql`
  query ME_CRITEO {
    me {
      id
      email
    }
  }
`;

export function Criteo() {
  const { data: dataMe, loading: loadingMe } = useQuery(ME_QUERY, {
    errorPolicy: "ignore"
  });
  const { data, loading, error } = useQuery(CRITEO_QUERY);

  if (error) {
    if (handleApolloError(error)) return null;
  }
  if (
    IS_BROWSER &&
    !error &&
    !loading &&
    !loadingMe &&
    !window.Criteo_INITIALIZED
  ) {
    const tagManagerArgs = {
      gtmId: data.configuration.google_tag_manager_id, // este ID depende del pais
      dataLayer: {
        event: "crto_homepage",
        crto: {
          email: dataMe != null && dataMe.me != null ? dataMe.me.email : "" //can be empty string if email not known
        }
      }
    };
    TagManager.initialize(tagManagerArgs);
    window.Criteo_INITIALIZED = true;
  }

  return <React.Fragment/>;
}
