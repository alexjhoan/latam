// Estilos Destacado Home
import theme from "../IC2_theme.js";
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
      rgba(0, 0, 0, 0.55) 0%,
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
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 1;
    animation: FadeIn 1.5s ease 1s 1 forwards;
    transition: opacity 1000ms ease;
  }
  .destacadoHome :global(.background-container) {
    width: calc(100% - ${theme.spacing.sm * 2}px);
    position: absolute;
    bottom: ${theme.spacing.sm}px;
    right: 50%;
    transform: translateX(50%);
    z-index: 3;
    text-decoration: none;
    opacity: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .destacadoHome :global(.background-logo) {
    width: 100%;
    padding: ${theme.spacing.sm}px;
    max-width: 100%;
    box-sizing: border-box;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    opacity: 0;
    text-decoration: none;
    animation: slideInFromBottom 1s ease 1s 1 forwards;
    border-radius: 8px;
  }

  .destacadoHome :global(.background-logo picture) {
    height: 100%;
    width: 100%;
  }
  .destacadoHome :global(.background-logo .logo) {
    margin: 0 auto;
    padding-bottom: 0px;
    display: inline-block;
    width: 100%;
    max-height: 50px;
    object-fit: contain;
    object-position: center;
  }
  .destacadoHome :global(.background-logo .text) {
    flex-basis: 100%;
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px 12px;
    font-size: 16px;
    line-height: 20px;
  }
  .destacadoHome :global(.background-logo .text .logo-text) {
    display: block;
  }
  .destacadoHome :global(.background-logo .text .logo-name) {
    display: none;
  }
  .destacadoHome :global(.background-logo .ver) {
    padding: 0px;
    font-size: 30px;
    display: inline-block;
    width: auto;
    margin-top: 0px;
    box-sizing: border-box;
    flex-basis: auto;
    border-radius: 8px;
  }
  .destacadoHome :global(.background-logo .ver span) {
    display: inline;
  }
  .destacadoHome :global(.background-logo .ver span) {
    display: none;
  }
  .destacadoHome :global(.background-logo .ver i) {
    display: block;
  }
  @media screen and (min-width: ${theme.breakPoints.sm}px) {
    .destacadoHome :global(.background-logo) {
      min-height: 80px;
    }
    .destacadoHome :global(.background-container) {
      width: calc(100% - ${theme.spacing.md * 2}px);
      bottom: ${theme.spacing.md}px;
    }
  }
  @media screen and (min-width: ${theme.breakPoints.lg}px) {
    .destacadoHome:before {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.45) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    .destacadoHome :global(.background-container) {
      position: absolute;
      right: ${theme.spacing.lg}px;
      bottom: ${theme.spacing.lg}px;
      width: auto;
      transform: none;
    }
    .destacadoHome :global(.background-logo) {
      cursor: pointer;
      width: 239px;
      min-height: 139px;
      transform: translateX(0px);
      animation: slideInFromLeft 1s ease 1s 1 forwards;
      display: block;
      padding: 10px;
      box-sizing: content-box;
    }
    .destacadoHome :global(.background-logo .logo) {
      max-height: 1100px;
    }
    .destacadoHome :global(.background-logo .ver) {
      text-align: center;
      padding: 8px;
      width: 100%;
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }
    .destacadoHome :global(.background-logo .ver span) {
      display: block;
    }
    .destacadoHome :global(.background-logo .ver i) {
      display: none;
    }
    .destacadoHome :global(.background-logo .text) {
      overflow: visible;
      text-overflow: initial;
      margin-left: 0px;
      margin-right: 0px;
      max-height: 100%;
      font-size: 14px;
    }
  }
`;
