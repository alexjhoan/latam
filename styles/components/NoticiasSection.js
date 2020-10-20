// Estilos Noticias Old
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  .NoticiasSection {
    padding: 50px 0px;
    background-color: #f7f9f9;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }
  .NoticiasSection a {
    text-decoration: none;
  }
  .NoticiasSection h2 {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 80px;
    font-size: 33px;
    text-align: center;
    position: relative;
    font-weight: lighter;
  }
  .NoticiasSection h2 a {
    color: ${theme.colors.text};
    transition: all 0.35s ease;
  }
  .NoticiasSection h2:hover a {
    color: ${theme.colors.primary};
  }
  .NoticiasSection h2:after {
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
  .NoticiasSection :global(.carrouselArrow) {
    position: absolute;
    top: 0px;
    width: 40px;
    height: 100%;
    font-size: 35px;
    color: #777777;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .NoticiasSection :global(.carrouselArrow.left) {
    left: -50px;
  }
  .NoticiasSection :global(.carrouselArrow.right) {
    right: -50px;
  }
  .NoticiasSection :global(.slick-dots li button:before) {
    font-size: 11px;
  }
  .NoticiasSection :global(.slick-dots li) {
    width: 8px;
  }
  .NoticiasSection :global(.slick-dots) {
    bottom: -50px;
  }
  .NoticiasSection .SliderContainer {
    margin-bottom: 50px;
  }
  .NoticiasSection .boton {
    width: 230px;
    margin: 0 auto;
    text-align: center;
    display: block;
    height: auto;
    padding: 12px 2px;
    text-decoration: none;
    margin-top: 30px;
    font-size: 16px;
    font-weight: normal;
    transition: background 0.35s ease;
    background-color: transparent;
    border: 1px solid ${theme.colors.primary};
    color: #fff;
    background-color: ${theme.colors.primary};
    border-radius: 4px;
    margin-top: 80px;
    cursor: pointer;
  }
  .NoticiasSection .boton:hover {
    border: 1px solid ${theme.colors.primaryHover};
    background-color: ${theme.colors.primaryHover};
  }
  @media screen and (max-width: 1180px) {
    .NoticiasSection {
      display: none;
    }
    .NoticiasSection .SliderContainer {
      width: calc(100% - 80px);
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media screen and (max-width: 768px) {
    .NoticiasSection .SliderContainer {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
