// css externo
import css from "styled-jsx/css";

export default css.global`
  * {
    font-family: Roboto, sans-serif;
  }
  html,
  body {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  body {
    width: 100%;
    min-height: 100vh;
    background-color: #f0f0f0;
    font-family: Roboto, sans-serif;
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
    font-family: Roboto, sans-serif;
    border: 0;
    cursor: pointer;
    overflow: visible;
    -webkit-appearance: button;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  main {
    width: 100%;
    background-color: #848382;
    height: 600px;
    position: relative;
    box-sizing: border-box;
    font-family: Roboto;
    overflow: hidden;
    transition: min-height 0.4s ease;
  }

  // layout
  .layout-container {
    width: 100%;
    max-width: 1180px;
    padding: 0 10px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .layout-container {
  }
  .css-display-f {
    display: flex;
  }

  [class^="icon-"]:before,
  [class*=" icon-"]:before {
    font-family: "infocasas";
    font-style: normal;
    font-weight: normal;
    speak: none;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: 0.2em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media (max-width: 1180px) {
    .layout-container {
      width: calc(100% - 40px);
      max-width: 960px;
      padding: 0 10px;
      box-sizing: border-box;
    }
    main {
      height: 500px;
    }
  }
  @media (max-width: 768px) {
    .layout-container {
      width: calc(100% - 15px);
    }
  }
`;
