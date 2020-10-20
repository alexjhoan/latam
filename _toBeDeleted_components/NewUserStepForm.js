import { useMutation,gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import cookie from "js-cookie";
import { useRef, useEffect } from "react";
import Console from "../lib/console";
import ContinueButton from "./ContinueButton";
import FormErrors from "./FormErrors";
import ImagenOptimizada from "./ImagenOptimizada";
import SignUpModalStyles from "../styles/components/SignUpModal";
import { MUTATION_LOCAL_STORE, Queries } from "../shared-components/ApolloResolvers";
import { handleApolloError } from "../lib/apollo.js";
import {
  QUERY_SIGN_UP_MODAL,
  TYPENAME_SIGN_UP_MODAL,
} from "../shared-components/ApolloResolvers/SignUpModal";

const REGISTER_MUTATION = gql`
  mutation registerIndividual($email: String!, $password: String) {
    registerIndividual(input: { email: $email, password: $password }) {
      access_token
      refresh_token
      expires_in
      token_type
      user_md5
    }
  }
`;
const FIRST_STEP = "first_step";

const NewUserStepForm = ({
  NEW_USER_STEP,
  currentStep,
  isLoadingButton,
  setLoadingButton,
  currentEmail,
  showSignUpModal,
  setStep,
}) => {
  const { register, handleSubmit, errors, setError, clearError } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    submitFocusError: true,
  });
  const initStateStep = FIRST_STEP;
  const inputRef = useRef(null);
  const [registerIndividual, { data }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      cookie.set("frontend_token", data.registerIndividual.access_token);
      localStorage.setItem("user_md5", data.registerIndividual.user_md5);
      closeModal();
      location.reload();
    },
    onError: (error) => {
      setLoadingButton(false);
      if (error.graphQLErrors.length > 0) {
        const {
          message,
          extensions: { validation, category },
        } = error.graphQLErrors[0];

        if (category == "validation") {
          if (typeof validation["input.email"] != "undefined") {
            setError("password", "notMatch", validation["input.email"][0]);
            focus();
          } else if (typeof validation["input.password"] != "undefined") {
            setError("password", "notMatch", validation["input.password"][0]);
            focus();
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

  const onSubmitExistingUserStep = (data, e) => {
    let variables = {
      email: currentEmail,
    };
    if (typeof data != "undefined" && typeof data.password != "undefined") {
      variables["password"] = data.password;
    }
    clearError();
    setLoadingButton(true);
    registerIndividual({ variables: variables });
  };

  const focus = () => inputRef.current.focus();
  useEffect(() => focus());

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmitExistingUserStep)}>
        <div
          id="ingresoUsarioNuevo"
          className="ventana"
          style={{
            display: currentStep == NEW_USER_STEP ? "block" : "none",
          }}
        >
          <div className="type">
            <div className="type_text">
              <ImagenOptimizada
                src="https://cdn2.infocasas.com.uy/web/5be5d78612ca1_infocdn__key_1f511-min.png"
                alt="icono"
              />
              <span>Escribe una contraseña</span>
              <br />
              <span>para registrarte</span>
            </div>
          </div>
          <span className="labelInput">Contraseña</span>
          <input
            className={Object.keys(errors).length === 0 ? "" : "error"}
            name="password"
            type="password"
            ref={(e) => {
              register(e, {
                required: "La contraseña debe contener al menos 8 caracteres",
                minLength: {
                  value: 8,
                  message: "La contraseña debe contener al menos 8 caracteres",
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
            fromStep={NEW_USER_STEP}
          >
            Continuar
          </ContinueButton>
          <div id="hacerDespues" onClick={onSubmitExistingUserStep}>
            <span>Hacer esto despúes</span>
          </div>
        </div>
      </form>
      <style jsx>{SignUpModalStyles}</style>
    </React.Fragment>
  );
};

export default NewUserStepForm;
