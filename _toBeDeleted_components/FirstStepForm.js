import cookie from "js-cookie";
import {gql} from "@apollo/client";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import ContinueButton from "./ContinueButton";
import FormErrors from "./FormErrors";
import SignUpModalStyles from "../styles/components/SignUpModal";
import { useRef, useEffect } from "react";
import getConfig from "next/config";
const { googleClientID, facebookAppID } = getConfig().publicRuntimeConfig;
import * as Sentry from "@sentry/browser";
import { handleApolloError } from "../lib/apollo";
import { showCustomMessageToast } from "./CustomMessageToast.js";
import { OfflineToastLoader } from "./OfflineToastLoader.js";
import { MUTATION_LOCAL_STORE, Queries } from "../shared-components/ApolloResolvers";
import {
  QUERY_SIGN_UP_MODAL,
  TYPENAME_SIGN_UP_MODAL,
} from "../shared-components/ApolloResolvers/SignUpModal";

const FIRST_STEP = "first_step";
const EXISTING_USER_STEP = "existing_user_step";

const SOCIAL_LOGIN_MUTATION = gql`
  mutation socialLogin($token: String!, $provider: String!, $email: String) {
    socialLogin(token: $token, provider: $provider, email: $email) {
      access_token
      refresh_token
      expires_in
      user_md5
    }
  }
`;

const USER_EXISTS_QUERY = gql`
  query userExists($email: String!) {
    userExists(email: $email) {
      id
    }
  }
`;

const FirstStepForm = ({
  currentStep,
  signUpModalType,
  isLoadingButton,
  setLoadingButton,
  initStateStep,
  NEW_USER_STEP,
  setStep,
  setEmail,
  showSignUpModal,
}) => {
  const [currentFBAccessToken, setFBAccessToken] = React.useState();
  const [disabledGG, setdisabledGG] = React.useState(null);
  const SIGN_UP_MODAL = useQuery(QUERY_SIGN_UP_MODAL);
  const { register, handleSubmit, errors, setError, clearError } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    submitFocusError: true,
  });
  const inputRef = useRef(null);
  const [MUTATOR_SOCIAL_LOGIN, { data }] = useMutation(SOCIAL_LOGIN_MUTATION, {
    onCompleted: (data) => {
      setLoadingButton(false);
      cookie.set("frontend_token", data.socialLogin.access_token);
      localStorage.setItem("user_md5", data.socialLogin.user_md5);
      location.reload();
    },
    onError: (error) => {
      setLoadingButton(false);
      if (error.graphQLErrors.length > 0) {
        const {
          message,
          extensions: { category },
        } = error.graphQLErrors[0];
        if (category == "authentication") {
          setError("usuario", "notMatch", message);
          focus();
        } else {
          setError(
            "password",
            "notMatch",
            "Hubo un error. Vuelve a intentalo más tarde."
          );
          focus();
          handleApolloError(error);
        }
      } else {
        setError(
          "password",
          "notMatch",
          "Hubo un error. Vuelve a intentalo más tarde."
        );
        focus();
        handleApolloError(error);
      }
    },
  });
  const [userExists, { dataUser, error }] = useLazyQuery(USER_EXISTS_QUERY, {
    onCompleted: (dataUser) => {
      setLoadingButton(false);
      setStep(EXISTING_USER_STEP);
    },
    onError: (error) => {
      setLoadingButton(false);
      if (error.graphQLErrors.length > 0) {
        const {
          message,
          extensions: { category },
        } = error.graphQLErrors[0];
        if (category == "NotFound") {
          setStep(NEW_USER_STEP);
        } else if (category == "WrongCountry") {
          setError("usuario", "notMatch", message);
          focus();
        } else {
          setError(
            "password",
            "notMatch",
            "Hubo un error. Vuelve a intentalo más tarde."
          );
          focus();
          handleApolloError(error);
        }
      } else {
        setError(
          "password",
          "notMatch",
          "Hubo un error. Vuelve a intentalo más tarde."
        );
        focus();
        handleApolloError(error);
      }
    },
    fetchPolicy: "no-cache",
  });
  const onSubmitFirstStep = (data, e) => {
    setEmail(data.usuario);
    clearError();
    setLoadingButton(true);

    if (currentFBAccessToken) {
      MUTATOR_SOCIAL_LOGIN({
        variables: {
          token: currentFBAccessToken,
          provider: "facebook",
          email: data.usuario,
        },
      });
    } else {
      userExists({
        variables: {
          email: data.usuario,
        },
      });
    }
  };
  const googleSuccess = (response) => {
    MUTATOR_SOCIAL_LOGIN({
      variables: {
        token: response.accessToken,
        provider: "google",
      },
    });
  };
  const googleFailure = (response) => {
    if (response.error == "network_error") {
      showCustomMessageToast(
        "offline-toast",
        <React.Fragment>
          <OfflineToastLoader />
          <span style={{ marginLeft: "12px" }}>Sin conexión a Internet.</span>
        </React.Fragment>
      );
    } else if (response.error == "idpiframe_initialization_failed") {
      setdisabledGG(
        "Para utilizar este botón debes activar las cookies de tercero"
      );
    } else if (response.error != "popup_closed_by_user") {
      console.error(JSON.stringify(response)); //debug even more info
      Sentry.captureException(response.error);
    }
  };

  const responseFacebook = (response) => {
    if (response.status == "unknown") {
      return;
    }

    if (
      !("email" in response) ||
      response.email === "undefined" ||
      response.email === ""
    ) {
      // el usuario no nos devolvio el mail en FB (caso guille)
      setFBAccessToken(response.accessToken);
      setError(
        "usuario",
        "notMatch",
        "Por favor, ingresa tu correo electrónico."
      );
    } else {
      MUTATOR_SOCIAL_LOGIN({
        variables: {
          token: response.accessToken,
          provider: "facebook",
        },
      });
    }
  };
  const focus = () => inputRef.current.focus();
  useEffect(() => focus());

  if (SIGN_UP_MODAL.loading) {
    return <React.Fragment>Cargando</React.Fragment>;
  }

  if (SIGN_UP_MODAL.error) {
    return <React.Fragment>Error</React.Fragment>;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmitFirstStep)}>
        <div
          id="ingresoCorreoDeUsuario"
          className="ventana"
          style={{
            display: currentStep == FIRST_STEP ? "block" : "none",
          }}
        >
          <div className="type">
            <div className="type_text">
              <span className="messages">
                {SIGN_UP_MODAL.data[TYPENAME_SIGN_UP_MODAL].type == "inicio"
                  ? "¡Bienvenido!"
                  : "Regístrate en InfoCasas"}
              </span>
            </div>
          </div>
          <span className="labelInput">Correo electrónico</span>
          <input
            className={Object.keys(errors).length === 0 ? "" : "error"}
            placeholder="Correo electrónico"
            name="usuario"
            ref={(e) => {
              register(e, {
                required: "Ingresa un correo válido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Ingresa un correo válido",
                },
              });
              inputRef.current = e;
            }}
            type="text"
          />
          <FormErrors formErrors={errors} />
          <ContinueButton
            isLoading={isLoadingButton}
            showSignUpModal={showSignUpModal}
            currentStep={currentStep}
            fromStep={FIRST_STEP}
          >
            Continuar
          </ContinueButton>
          <div className="sub">
            <span className="line"></span>
            <span className="o">O</span>
            <span className="line"></span>
            <GoogleLogin
              clientId={googleClientID}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
              className="ingresar g"
              disabled={disabledGG != null}
              language="es_ES"
              render={(renderProps) => (
                <div
                  className={
                    "ingresar g" + (renderProps.disabled ? " disabled" : "")
                  }
                  onClick={renderProps.disabled ? null : renderProps.onClick}
                >
                  <i className="icon-google"></i>
                  <span className="text-container">Ingresar con Google</span>
                  {renderProps.disabled && (
                    <div className="disabledGG_message">{disabledGG}</div>
                  )}
                </div>
              )}
            />
            <FacebookLogin
              appId={facebookAppID}
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="ingresar f"
              language="es_ES"
              render={(renderProps) => (
                <div className="ingresar f" onClick={renderProps.onClick}>
                  <i className="icon-facebook-1"></i>
                  <span className="text-container">Ingresar con Facebook</span>
                </div>
              )}
            />
          </div>
          <a href="/soyinmobiliaria">
            ¿Sos inmobiliaria y todavía no estas registrado?{" "}
            <br className="mobile" />
            Regístrate aquí
          </a>
        </div>
      </form>
      <style jsx>{SignUpModalStyles}</style>
    </React.Fragment>
  );
};

export default FirstStepForm;
