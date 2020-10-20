const FIRST_STEP = "first_step";
const EXISTING_USER_STEP = "existing_user_step";
const NEW_USER_STEP = "new_user_step";

import { MUTATION_LOCAL_STORE, Queries } from "../shared-components/ApolloResolvers";
import {
  QUERY_SIGN_UP_MODAL,
  TYPENAME_SIGN_UP_MODAL,
} from "../shared-components/ApolloResolvers/SignUpModal";

import SignUpModalStyles from "../styles/components/SignUpModal";
import FirstStepForm from "./FirstStepForm";
import NewUserStepForm from "./NewUserStepForm";
import ExistingUserStepForm from "./ExistingUserStepForm";
import WindowEventListener from "./WindowEventListener";
import ImagenOptimizada from "./ImagenOptimizada";
import { useQuery, useMutation } from "@apollo/client";

import { useRef, useState, useEffect } from "react";

const SignUpModalForm = (props) => {
  const initStateStep = FIRST_STEP;
  const initStateEmail = "";
  const initStateLoadingButton = false;
  const [currentStep, setStep] = useState(initStateStep);
  const [isLoadingButton, setLoadingButton] = useState(initStateLoadingButton);
  const [currentEmail, setEmail] = useState(initStateEmail);
  const { data, loading, error } = useQuery(QUERY_SIGN_UP_MODAL);
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
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      typeof data != "undefined" &&
      data[TYPENAME_SIGN_UP_MODAL].open &&
      modalRef.current === event.target
    )
      closeModal();
  };
  const closeOnEscape = (e) => {
    if (
      typeof data != "undefined" &&
      data[TYPENAME_SIGN_UP_MODAL].open &&
      e.code == "Escape"
    )
      closeModal();
  };
  WindowEventListener("click", handleClickOutside, false);
  WindowEventListener("keydown", closeOnEscape, false);

  const [bodyScrollPos, changeBodyScrollPos] = useState(0);
  const lockBodyScrolling = () => {
    // Get scroll position to be able to restore it in onCloseModal
    changeBodyScrollPos(
      document.body.scrollTop || document.documentElement.scrollTop || 0
    );
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${bodyScrollPos}px`;
  };
  const restoreBodyScrolling = () => {
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    document.documentElement.scrollTop = document.body.scrollTop = bodyScrollPos;
  };

  useEffect(() => {
    if (!loading && !error && data[TYPENAME_SIGN_UP_MODAL].open) {
      lockBodyScrolling();
    } else if (!loading && !error && !data[TYPENAME_SIGN_UP_MODAL].open) {
      restoreBodyScrolling();
    }
    return () => { };
  }, [loading, data, error]);

  if (loading) return <React.Fragment>Cargando</React.Fragment>;
  if (error) return <React.Fragment>Error</React.Fragment>;
  if (!data) return <React.Fragment>Error modal</React.Fragment>;

  /* click fuera del modal */

  return (
    <React.Fragment>
      <div
        id="blanket"
        className="close-pop"
        ref={modalRef}
        style={{
          display: data[TYPENAME_SIGN_UP_MODAL].open ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        }}
      >
        <div
          id="login-with-pop"
          className="pop full centerVerticalToParent"
          style={{
            display: data[TYPENAME_SIGN_UP_MODAL].open ? "block" : "none",
          }}
        >
          <div className="cerrar_consultar" onClick={closeModal}>
            <i className="icon-cancel"></i>
            <span style={{ display: "none" }}>No gracias, vivo solo</span>
          </div>

          <div id="type_persona">
            <FirstStepForm
              NEW_USER_STEP={NEW_USER_STEP}
              currentStep={currentStep}
              setStep={setStep}
              signUpModalType={props.signUpModalType}
              isLoadingButton={isLoadingButton}
              setLoadingButton={setLoadingButton}
              initStateStep={initStateStep}
              setEmail={setEmail}
              showSignUpModal={data[TYPENAME_SIGN_UP_MODAL].open}
            />
            <NewUserStepForm
              NEW_USER_STEP={NEW_USER_STEP}
              currentStep={currentStep}
              setStep={setStep}
              isLoadingButton={isLoadingButton}
              setLoadingButton={setLoadingButton}
              currentEmail={currentEmail}
              closeModal={closeModal}
              showSignUpModal={data[TYPENAME_SIGN_UP_MODAL].open}
            />
            <ExistingUserStepForm
              EXISTING_USER_STEP={EXISTING_USER_STEP}
              currentStep={currentStep}
              setStep={setStep}
              isLoadingButton={isLoadingButton}
              setLoadingButton={setLoadingButton}
              currentEmail={currentEmail}
              closeModal={closeModal}
              showSignUpModal={data[TYPENAME_SIGN_UP_MODAL].open}
            />
            <form>
              <div
                id="ingresoInvitacion"
                className="ventana"
                style={{ display: "none" }}
              >
                <div className="type">
                  <div className="type_text">
                    <ImagenOptimizada
                      src="https://cdn2.infocasas.com.uy/web/5be5daaf9f4e0_infocdn__busts-in-silhouette_1f465-min.png"
                      alt="icono"
                    />
                    <span>Vivis con alguien más?</span>
                    <br />
                    <span>Mostrale lo que estas buscando</span>
                  </div>
                </div>
                <span className="labelInput">
                  Correo electrónico de la persona con quien vivis
                </span>
                <input
                  name="usuario_invitado"
                  data-prompt="Ingrese email"
                  type="text"
                />
                <span className="mensaje" style={{ display: "none" }}>
                  Correo inválido.
                </span>
                <div className="ingresarInvitacion c orangeHover">
                  Continuar
                </div>
              </div>
            </form>
            <form>
              <div
                id="ingresandoInfocasas"
                className="ventana"
                style={{ display: "none" }}
              >
                <div className="type">
                  <div className="type_text">
                    <ImagenOptimizada
                      src="https://cdn2.infocasas.com.uy/web/5be5d7ac78ced_infocdn__waving-hand-sign_1f44b-min.png"
                      alt="icono"
                    />
                    <span>Bienvenido a InfoCasas!</span>
                    <br />
                    <span>Redirigiendo...</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{SignUpModalStyles}</style>
    </React.Fragment>
  );
};

export default SignUpModalForm;
