// Estilos Inmobiliarias Destacadas

import css from "styled-jsx/css";

export default css`
  .InmobiliariasDestacadas :global(.inmoLogo) {
    width: calc(100% - 16px) !important;
    padding: 10px 0px;
    height: 90px;
    box-sizing: border-box;
    margin: 0px auto;
    display: block !important;
    /* box-shadow: 0 2px 5px -3px rgba(0, 0, 0, 0.32); */
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .InmobiliariasDestacadas :global(.inmoLogo a) {
    width: 100%;
    height: 100%;
  }
  .InmobiliariasDestacadas :global(.inmoLogo img) {
    height: 100%;
    max-width: 130px;
    width: 100%;
    margin: 0 auto;
    object-fit: contain;
  }
  .InmobiliariasDestacadas :global(.slick-list) {
    margin: 0px 22px;
  }
  .InmobiliariasDestacadas :global(.carrouselArrow) {
    position: absolute;
    top: 0px;
    height: 100%;
    z-index: 2;
    width: 45px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #777777;
  }
  .InmobiliariasDestacadas :global(.slick-track) {
    display: flex;
    align-items: center;
    min-width: 100%;
    justify-content: center;
  }
  .InmobiliariasDestacadas :global(.carrouselArrow.left) {
    left: 0px;
  }
  .InmobiliariasDestacadas
    :global(.carrouselArrow.left .icon-angle-left:before) {
    text-align: left;
  }
  .InmobiliariasDestacadas :global(.carrouselArrow.right) {
    right: 0px;
  }
  .InmobiliariasDestacadas
    :global(.carrouselArrow.right .icon-angle-right:before) {
    text-align: right;
  }
  :global(#__next .main) {
    min-height: calc(100vh-180px) !important;
  }
  @media screen and (max-width: 1180px) {
    .InmobiliariasDestacadas {
      width: calc(100% - 60px);
      margin: 0px auto;
    }
    .InmobiliariasDestacadas :global(.carrouselArrow) {
      width: 30px;
      font-size: 25px;
    }
    .InmobiliariasDestacadas :global(.inmoLogo) {
      height: 80px;
      padding: 10px 0px;
    }
  }
  @media screen and (max-width: 768px) {
    .InmobiliariasDestacadas :global(.carrouselArrow.left) {
      left: -30px;
    }
    .InmobiliariasDestacadas :global(.carrouselArrow.right) {
      right: -30px;
    }
    .InmobiliariasDestacadas :global(.slick-list) {
      margin: 0px;
    }
  }
`;
