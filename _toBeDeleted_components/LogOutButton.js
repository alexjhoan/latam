import { useMutation } from "@apollo/client";
import { handleApolloError } from "../lib/apollo";
import {gql} from "@apollo/client";
import theme from "../styles/theme";

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      status
      message
    }
  }
`;
const LogOutButton = () => {
  const removeCookieAndLocalStorage = async () => {
    const cookie = await import("js-cookie");
    cookie.remove("frontend_token");
    localStorage.removeItem("user_md5");
    localStorage.removeItem("one_tap_logged");
    window.location = "/sitio/index.php?mid=login&func=logout";
  };
  const [logOut, { ...logOutResponse }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: (logOutResponse) => {
      removeCookieAndLocalStorage();
    },
    onError: (error) => {
      if (handleApolloError(error)) return null;
    },
  });
  return (
    <React.Fragment>
      <li
        className={logOutResponse.loading ? "disabled" : ""}
        onClick={() => (!logOutResponse.loading ? logOut() : null)}
      >
        <a className="cerrar_sesion">
          <span className="text">Cerrar sesión</span>
        </a>
      </li>
      <style jsx>{`
        .cerrar_sesion {
          width: 100%;
        }
        li {
          display: block;
          border: 0;
          float: none;
          text-align: left;
          background-color: #ffffff;
          transition: all 0.3s ease;
          line-height: 35px;
          color: ${theme.colors.text};
          cursor: pointer;
          border-radius: 3px;
          overflow: hidden;
        }
        li.disabled {
          cursor: auto;
          user-select: none;
          position: relative;
        }
        li:hover,
        li.disabled {
          background-color: #eeeeee;
        }
        li a {
          padding: 7px 9px;
          box-sizing: border-box;
        }
        @media screen and (max-width: 980px) {
          li {
            border-bottom: none;
            float: none;
            height: auto;
            line-height: 50px;
            min-height: 50px;
            text-align: left;
            width: 100%;
            border-right: 0px;
            border-left: 0px !important;
            font-size: 16px;
            box-sizing: border-box;
            padding: 4px 11px;
            margin-top: 10px;
          }
          li a {
            padding: 0px;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default LogOutButton;
