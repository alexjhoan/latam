import dynamic from "next/dynamic";
import {gql} from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import { MUTATION_LOCAL_STORE } from "../shared-components/ApolloResolvers";
import { QUERY_SIGN_UP_MODAL } from "../shared-components/ApolloResolvers/SignUpModal";
import { handleApolloError } from "../lib/apollo";
import getConfig from "next/config";
import LogRocket from "logrocket";

const {
  logrocketID,
} = getConfig().publicRuntimeConfig;


const CURRENT_USER_QUERY = gql`
  query ME_HEADER {
    me {
      firstName
      name
      id
      email
      individual
      logo
      country_id
      property_count
      notifications(first: 5) {
        data {
          id
          created_at
          text
          url
          new_tab
          seen
          image
        }
      }
      unread_notifications
    }
  }
`;
const HEADER_QUERY = gql`
  query MiConfiguration_Header {
    configuration {
      header_configuration {
        buttons {
          id
          text
          url
          order
          title
          image
          display
          orderMobile
          userShow
          classname
          children {
            id
            text
            url
            order
            title
            image
            classname
            display
            orderMobile
            userShow
          }
        }
      }
    }
  }
`;

const HeaderMobile = dynamic({
  loader: () => import("./HeaderMobile")
});

const HeaderDesktop = dynamic({
  loader: () => import("./HeaderDesktop")
});

const Header = props => {
  const { data: dataMe, loading: loadingMe, refetch } = useQuery(
    CURRENT_USER_QUERY,
    {
      errorPolicy: "ignore"
    }
  );
  const { data: header, loading: load, error: err } = useQuery(HEADER_QUERY);
  const [clicksOnSignIn] = useMutation(MUTATION_LOCAL_STORE, {
    variables: {
      new_state: {
        open: true,
        type: "inicio"
      },
      query: QUERY_SIGN_UP_MODAL
    }
  });
  const [clicksOnSignUp] = useMutation(MUTATION_LOCAL_STORE, {
    variables: {
      new_state: {
        open: true,
        type: "registro"
      },
      query: QUERY_SIGN_UP_MODAL
    }
  });

  if (err) {
    if (handleApolloError(err)) return null;
  }
  if (load || loadingMe) return <div>loading</div>;

  let dataProp = {
    ...props,
    isLoggedIn: dataMe != null && dataMe.me != null,
    currentUser: dataMe != null ? dataMe.me : null,
    refetchCurrentUser: refetch,
    buttons: header.configuration.header_configuration.buttons,
    clicksOnSignIn: clicksOnSignIn,
    clicksOnSignUp: clicksOnSignUp
  };

  if (dataProp.isLoggedIn && logrocketID) {
    LogRocket.identify(dataProp.currentUser.id, {
      name: dataProp.currentUser.name,
      email: dataProp.currentUser.email,
      individual: dataProp.currentUser.individual
    });
  }

  return (
    <React.Fragment>
      <HeaderMobile {...dataProp} />
      <HeaderDesktop {...dataProp} />
    </React.Fragment>
  );
};

export default Header;
