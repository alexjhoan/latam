// Estilos BlockCollapse

import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  .LinkBoxes {
    background: white;
    padding: 50px 0px;
    border-top: 1px solid #e6e6e6;
  }
  .LinkBoxes .LinkBoxesContainer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .LinkBoxes :global(.img) {
    width: 100%;
    max-width: 56px;
    height: auto;
    margin: 0 auto;
    text-align: center;
    display: block;
    padding-bottom: 20px;
  }
  .LinkBoxes h2 {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 80px;
    font-size: 24px;
    text-align: center;
    position: relative;
    font-weight: lighter;
    color: ${theme.colors.text};
  }
  .LinkBoxes h2:after {
    content: " ";
    width: 140px;
    height: 1px;
    background-color: #999;
    position: absolute;
    border: 1x solid #999;
    top: 65px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  @media screen and (max-width: 1180px) {
    .LinkBoxes .layout-container {
      max-width: 100%;
      width: 100%;
      padding: 0px;
    }
    .LinkBoxes .LinkBoxesContainer {
      flex-direction: column;
    }
    .LinkBoxes :global(.LinkBox:last-child .BlockCollapse) {
      border-bottom: none;
    }
  }
`;
