// Estilos Destacado Home
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideInFromBottom {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes FadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .destacadoHome {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
  }
  .destacadoHome:before {
    content: "";
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    width: 100%;
    height: 50%;
    max-height: 430px;
    min-height: 200px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
  }

  .destacadoHome :global(.background) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .destacadoHome :global(.background) {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 1;
    animation: FadeIn 1.5s ease 1s 1 forwards;
    transition: opacity 1000ms ease;
  }
  .destacadoHome :global(.background-container) {
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }
  .destacadoHome :global(.background-logo) {
    position: absolute;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
    padding: 10px;
    max-width: 237px;
    min-height: 139px;
    width: 100%;
    transform: translateX(-100%);
    text-decoration: none;
    opacity: 1;
    transform: translateX(0px);
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    opacity: 0;
    animation: slideInFromLeft 1s ease 1s 1 forwards;
  }
  .destacadoHome :global(.background-logo picture) {
    width: 100%;
  }
  .destacadoHome :global(.background-logo .logo) {
    margin: 0 auto;
    padding-bottom: 0px;
    display: inline-block;
    width: 100%;
    max-height: 110px;
    object-fit: contain;
    object-position: center;
  }
  .destacadoHome :global(.background-logo .text) {
    font-size: 14px;
    line-height: 20px;
  }
  .destacadoHome :global(.background-logo .text .logo-text) {
    display: block;
  }
  .destacadoHome :global(.background-logo .text .logo-name) {
    display: none;
  }

  .destacadoHome :global(.background-logo .ver) {
    text-align: center;
    padding: 6px 65px;
    border-radius: 3px;
    font-size: 14px;
    display: block;
    width: 100%;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .destacadoHome :global(.background-logo .ver span) {
    display: inline;
  }
  .destacadoHome :global(.background-logo .ver i) {
    display: none;
  }
  @media screen and (max-width: 980px) {
    .destacadoHome:before {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    .destacadoHome :global(.background-container) {
      width: 101%;
    }
    .destacadoHome :global(.background-logo) {
      width: 100%;
      right: 0px;
      bottom: 0px;
      padding: 2% 10px;
      max-width: 100%;
      box-sizing: border-box;
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      animation: slideInFromBottom 1s ease 1s 1 forwards;
    }
    .destacadoHome :global(.background-logo picture) {
      height: 100%;
    }
    .destacadoHome :global(.background-logo .logo) {
      max-height: 100%;
      object-fit: contain;
      object-position: center;
    }

    .destacadoHome :global(.background-logo .text) {
      flex-basis: 100%;
      max-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 12px;
    }
    .destacadoHome :global(.background-logo .ver) {
      text-align: center;
      padding: 0% 0px 0px 0px;
      font-size: 30px;
      display: inline-block;
      margin-top: 0px;
      width: auto;
    }

    .destacadoHome :global(.background-logo .ver span) {
      display: none;
    }
    .destacadoHome :global(.background-logo .ver i) {
      display: block;
    }
  }
  @media screen and (max-width: 680px) {
    .destacadoHome :global(.background-logo) {
      min-height: 50px;
    }
    .destacadoHome :global(.background-logo .logo) {
      max-height: 50px;
    }
  }
`;
