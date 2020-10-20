import ReactPixel from "react-facebook-pixel";
import { useQuery } from "@apollo/client";
import {gql} from "@apollo/client";
import {handleApolloError} from "../lib/apollo";

const FB_ID_QUERY = gql`
  query FB_ID {
    configuration {
      facebook_configuration {
        pixel_id
      }
    }
  }
`;
const IS_BROWSER = typeof window !== "undefined";

export function FacebookPixel() {
  const { data, loading, error } = useQuery(FB_ID_QUERY);
  if (error) {
    if (handleApolloError(error)) return null;
  }

  if (IS_BROWSER && !window.FB_INITIALIZED && !error && !loading) {
    ReactPixel.init(data.configuration.facebook_configuration.pixel_id);
    window.FB_INITIALIZED = true;
  }

  return <React.Fragment/>;
}

export function PageViewFB() {
  ReactPixel.pageView();
}

export function eventFB(name = "", data = {}) {
  if (name && Object.keys(data).length === 0) {
    ReactPixel.event(event, data);
  }
}
