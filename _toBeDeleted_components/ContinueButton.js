import React from "react";
import SignUpModalStyles from "../styles/components/SignUpModal.js";
import WindowEventListener from "./WindowEventListener";
// via https://humble.dev/creating-a-nice-loading-button-with-react-hooks

// via spinner https://medium.com/@leiaj/making-custom-spinners-with-css-4d890a4a1311

function Loader() {
  return (
    <React.Fragment>
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 3px solid #f3f3f3; /* Light grey */
          border-top: 3px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 12px;
          height: 12px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </React.Fragment>
  );
}

function ContinueButton({ children, isLoading, ...props }) {
  /* Capture the dimensions of the button before the loading happens
  so it doesn’t change size when showing the loader */
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef(null);

  const [showLoader, setShowLoader] = React.useState(false);

  // Save the dimensions here
  React.useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    }

    // Show loader a bits longer to avoid loading flash
    if (!isLoading && showLoader) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 400);

      // Don’t forget to clear the timeout
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isLoading, showLoader]);

  const onEnterPress = event => {
    if (event.code === "Enter") {
      if (
        props.showSignUpModal &&
        props.currentStep == props.fromStep &&
        ref != null
      ) {
        ref.current.click();
        event.preventDefault();
      }
    }
  };
  WindowEventListener("keydown", onEnterPress, false);

  return (
    <React.Fragment>
      <button
        className="button ingresarContraseña c orangeHover"
        ref={ref}
        disabled={isLoading}
        type="submit"
        style={
          width && height
            ? {
                width: `${width}px`,
                height: `${height}px`
              }
            : {}
        }
      >
        {showLoader ? <Loader /> : children}
      </button>
      <style jsx>{SignUpModalStyles}</style>
    </React.Fragment>
  );
}

export default ContinueButton;
