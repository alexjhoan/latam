// googleAnalytics.js
import React from 'react';
import { useQuery } from "@apollo/client";

import {gql} from "@apollo/client";
import ReactGA from "react-ga";
const IS_BROWSER = typeof window !== "undefined";

const GA_ID_QUERY = gql`
  query GA_ID {
    configuration {
      analytics_id
    }
  }
`;

export const GoogleAnalytics = () => {
  const { data, loading, error } = useQuery(GA_ID_QUERY);

  if (error) console.log("GA", error.message);

  if (IS_BROWSER && !window['GA_INITIALIZED'] && !error && !loading) {
    ReactGA.initialize(data.configuration.analytics_id, {
      titleCase: false
    });
    window['GA_INITIALIZED'] = true;
  }

  return <React.Fragment></React.Fragment>;
};

export const PageViewGA = () => {
  try {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  } catch (err) {}
};

export const TrackEventGA = ({ action, category, label, value }) => {
  try {
    ReactGA.event({
      action: action,
      category: category,
      label: label,
      value: value
    });
  } catch (err) {}
};
