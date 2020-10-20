import { useQuery, useMutation, gql } from "@apollo/client";
import getConfig from "next/config";
import { useEffect } from "react";
import cookie from "js-cookie";
import Console from "../lib/console";

import { handleApolloError } from "../lib/apollo";

const { googleClientID } = getConfig().publicRuntimeConfig;

const CURRENT_USER_QUERY = gql`
  query ME_HEADER {
    me {
      firstName
      name
      id
    }
  }
`;

const GOOGLE_ONE_TAP_MUTATION = gql`
  mutation googleOneTapLogin($token: String!) {
    googleOneTapLogin(token: $token) {
      access_token
      refresh_token
      expires_in
      user_md5
    }
  }
`;

const OneTapSignIn = (props) => {
  const me = useQuery(CURRENT_USER_QUERY, {
    errorPolicy: "ignore",
  });

  const handleResponse = (response) => {
    MUTATOR_ONE_TAP_LOGIN({
      variables: {
        token: response.credential,
      },
    });
  };
  const [MUTATOR_ONE_TAP_LOGIN, { data }] = useMutation(
    GOOGLE_ONE_TAP_MUTATION,
    {
      onCompleted: (data) => {
        cookie.set("frontend_token", data.googleOneTapLogin.access_token);
        localStorage.setItem("user_md5", data.googleOneTapLogin.user_md5);
        localStorage.setItem("one_tap_logged", "true");
        location.reload();
      },
      onError: (error) => {
        handleApolloError(error);
      },
    }
  );

  useEffect(() => {
    const google = window.google;
    if (
      (me.data == null || me.data.me == null) &&
      typeof google != "undefined"
    ) {
      const alreadyOneTapLogged = localStorage.getItem("one_tap_logged");

      google.accounts.id.initialize({
        client_id: googleClientID,
        callback: handleResponse,
        auto_select:
          typeof alreadyOneTapLogged != "undefined" &&
          alreadyOneTapLogged == "true",
      });
      google.accounts.id.prompt((n) =>
        Console.log("OneTap - " + n.getNotDisplayedReason())
      );
    }
  }, [me]);

  return (
    <React.Fragment>
      <div id="one-tap-container"></div>
    </React.Fragment>
  );
};

export default OneTapSignIn;
