import theme from "../styles/theme.js";
import css from "styled-jsx/css";

export const OfflineToastLoader = () => {
  return (
    <React.Fragment>
      <div className="loader">Loading...</div>
      <style jsx>{OfflineLoaderStyle}</style>
    </React.Fragment>
  );
};

const OfflineLoaderStyle = css`
  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: load7 1.8s infinite ease-in-out;
  }
  .loader {
    color: ${theme.colors.primary};
    font-size: 2px;
    margin: 10px 8px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0) translateY(-100%);
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    top: 0;
  }
  .loader:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 3.5em;
  }
  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`;
