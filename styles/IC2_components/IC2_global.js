// css externo
import css from "styled-jsx/css";
import theme from "../IC2_theme.js";
export default css.global`
  * {
    font-family: ${theme.fontFamily.sansSerif};
  }
  body {
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
    font-size: 13px;
    font-weight: 300;
    overflow-x: hidden;
  }
  .clearfix:after {
    content: "";
    clear: both;
    display: table;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  a,
  button,
  input,
  select,
  textarea {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  button,
  input {
    overflow: visible;
  }
  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    -webkit-appearance: button;
  }
  button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    font-family: ${theme.fontFamily.sansSerif};
    border: 0;
    cursor: pointer;
    overflow: visible;
    -webkit-appearance: button;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .centerVerticalToParent,
  .cvtp {
    position: relative;
    top: 50%;
    -ms-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .cerrar_consultar,
  .cerrar_popup {
    align-items: center;
    background-color: rgb(255, 253, 253);
    border: solid 2px #a3a3a3;
    border-radius: 50%;
    color: #a3a3a3;
    display: flex;
    height: 30px;
    justify-content: center;
    position: absolute;
    right: -16px;
    top: -15px;
    width: 30px;
    cursor: pointer;
    opacity: 0.9;
    z-index: 999;
  }
  .pop_full_size.cerrar_popup {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .css-display-f {
    display: flex;
  }
  .noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  // se va no deberia estar
  .layout-container {
    width: calc(100% - 80px);
    max-width: 1180px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: 1180px) {
    .layout-container {
      width: calc(100% - 40px);
      max-width: 960px;
      box-sizing: border-box;
    }
  }

  @media (max-width: 768px) {
    .layout-container {
      width: calc(100% - 15px);
    }
  }
`;
