// Estilos LinkBox - SeoLink
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  .LinkBox :global(.headerCollapse img) {
    max-width: 170px;
    width: 100%;
    margin-bottom: 30px;
    display: block;
  }
  .LinkBox :global(.headerCollapse span) {
    font-size: 20px;
    font-weight: 300;
    text-align: left;
    display: block;
    margin-bottom: 20px;
    color: ${theme.colors.text};
  }
  .LinkBox a.itemLink {
    display: block;
    text-decoration: none;
    margin-bottom: 10px;
    color: #999;
    transition: all 0.35s ease;
    font-size: 12px;
    font-weight: 300;
    cursor: pointer;
  }
  .LinkBox a.itemLink:hover {
    text-decoration: underline;
    color: #777;
  }
  @media screen and (max-width: 1180px) {
    .LinkBox {
      width: calc(100% - 20px);
      margin: 0 auto;
    }
    .LinkBox :global(.headerCollapse) {
      display: flex;
      align-items: center;
    }
    .LinkBox :global(.headerCollapse img) {
      width: 90px;
      margin-right: 20px;
      margin-bottom: 0px;
      margin-top: 0px;
    }
    .LinkBox :global(.headerCollapse span) {
      margin-bottom: 0px;
    }
    .LinkBox a.itemLink {
      display: none;
      margin: 0px;
      font-size: 14px;
    }
    .LinkBox :global(.open) .itemLink {
      display: block;
      margin: 15px 0px;
    }
  }
`;
