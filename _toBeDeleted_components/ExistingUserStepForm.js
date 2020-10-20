import {gql} from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import cookie from "js-cookie";
import { useEffect, useRef, useState } from "react";

import { MUTATION_LOCAL_STORE, Queries } from "../shared-components/ApolloResolvers";
import {
  QUERY_SIGN_UP_MODAL,
  TYPENAME_SIGN_UP_MODAL,
} from "../shared-components/ApolloResolvers/SignUpModal";
import ContinueButton from "./ContinueButton";
import FormErrors from "./FormErrors";
import SignUpModalStyles from "../styles/components/SignUpModal.js";
import Loader from "./Loader";
import ImagenOptimizada from "./ImagenOptimizada";
import { handleApolloError } from "../lib/apollo";

const FIRST_STEP = "first_step";
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
      refresh_token
      expires_in
      token_type
      user_md5
    }
  }
`;
const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(input: { email: $email })
  }
`;

const ExistingUserStepForm = ({
  EXISTING_USER_STEP,
  currentStep,
  currentEmail,
  isLoadingButton,
  setLoadingButton,
  showSignUpModal,
  setStep,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    submitFocusError: true,
  });
  const initStateStep = FIRST_STEP;
  const inputRef = useRef(null);
  const [forgotPass, setForgotPass] = useState(null);
  const [loadForgotPass, setLoadForgotPass] = useState(false);
  const [closeModal] = useMutation(MUTATION_LOCAL_STORE, {
    variables: {
      new_state: {
        open: false,
      },
      query: QUERY_SIGN_UP_MODAL,
    },
    onCompleted: () => {
      setLoadingButton(false);
      setStep(initStateStep);
    },
  });
  const focus = () => inputRef.current.focus();
  useEffect(() => focus());
  useEffect(() => reset(), [currentStep]);

  const onSubmitNewUserStep = (data, e) => {
    clearError();
    setLoadingButton(true);
    login({
      variables: {
        username: currentEmail,
        password: data.password,
      },
    });
  };

  const [login, { loginResponse }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (loginResponse) => {
      cookie.set("frontend_token", loginResponse.login.access_token);
      localStorage.setItem("user_md5", loginResponse.login.user_md5);
      closeModal();
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
          setError("password", "notMatch", message);
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

  const [forgotPassword, { dataPass }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    onCompleted: (dataPass) => {
      setLoadForgotPass(false);
      setForgotPass(dataPass.forgotPassword);
    },
    onError: (error) => {
      const {
        message,
        extensions: { category },
      } = error.graphQLErrors[0];
      setLoadForgotPass(false);
      if (category == "NotFound") {
        setForgotPass(message);
      } else {
        setForgotPass("Hubo un error. Vuelve a intentarlo más tarde.");
        handleApolloError(error);
      }
    },
    fetchPolicy: "no-cache",
  });

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmitNewUserStep)}>
        <div
          id="ingresoUsarioViejo"
          className="ventana"
          style={{
            display: currentStep == EXISTING_USER_STEP ? "block" : "none",
          }}
        >
          <div className="type">
            <div className="type_text">
              <ImagenOptimizada
                src={
                  "https://cdn2.infocasas.com.uy/web/5be5d7ac78ced_infocdn__waving-hand-sign_1f44b-min.png"
                }
                alt={"icono"}
              />
              <span>Bienvenido de nuevo.</span>
              <br />
              <span>Ingresa tu contraseña</span>
            </div>
          </div>
          <span className="labelInput">Tu contraseña</span>
          <input
            className={Object.keys(errors).length === 0 ? "" : "error"}
            name="password"
            type="password"
            placeholder="Contraseña:"
            ref={(e) => {
              register(e, {
                required: "Ingresá tu contraseña",
                minLength: {
                  value: 3,
                  message: "Ingresá tu contraseña",
                },
              });
              inputRef.current = e;
            }}
          />
          <FormErrors formErrors={errors} />
          <ContinueButton
            isLoading={isLoadingButton}
            showSignUpModal={showSignUpModal}
            currentStep={currentStep}
            fromStep={EXISTING_USER_STEP}
          >
            Continuar
          </ContinueButton>
          <div className="notMe">
            Estas ingresando como <span className="emailUser"></span>.
            <br />
            <a>Cambiar de cuenta</a>
          </div>

          {forgotPass != null ? (
            <div id="recuperar-pass">
              <p>{forgotPass}</p>
            </div>
          ) : (
              <div
                id="olvideContraseña"
                onClick={() => {
                  setLoadForgotPass(true);
                  forgotPassword({
                    variables: {
                      email: currentEmail,
                    },
                  });
                }}
              >
                {loadForgotPass ? (
                  <Loader color="#3d46c0" />
                ) : (
                    <span>Olvidé contraseña</span>
                  )}
              </div>
            )}
        </div>
      </form>
      <style jsx>{SignUpModalStyles}</style>
    </React.Fragment>
  );
};

export default ExistingUserStepForm;
