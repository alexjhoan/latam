// Estilos Footer
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  .BusquedasRecomendas .title {
    width: 100%;
    padding: 50px 0px 60px 0;
    background-color: rgba(77, 183, 183, 0.8);
    color: #fff;
    height: auto;
    overflow: hidden;
    position: relative;
    background-size: cover;
  }
  .BusquedasRecomendas .title i {
    position: relative;
    z-index: 1;
    font-size: 40px;
    color: #fff;
    width: 100%;
    text-align: center;
    display: block;
  }
  .BusquedasRecomendas .title h2 {
    position: relative;
    z-index: 1;
    text-align: center;
    font-size: 33px;
    font-weight: 300;
    color: #fff;
    padding-top: 25px;
    height: auto;
  }
  .recomendadas-container {
    padding: 45px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .recomendada {
    flex-basis: 31.8%;
    position: relative;
    margin-bottom: 2.2%;
    overflow: hidden;
    cursor: pointer;
    max-height: 255px;
  }
  .recomendada :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: none;
    transition: transform ease 300ms;
  }
  .recomendada:hover :global(img) {
    transform: scale(1.1);
  }
  .recomendada .overLay {
    bottom: 0px;
    right: 0px;
    position: absolute;
    width: 100%;
    height: 70px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
    z-index: 0;
  }
  .recomendada .text {
    position: absolute;
    bottom: 0px;
    width: 100%;
    left: 0px;
    color: white;
    padding: 7px;
    box-sizing: border-box;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    font-weight: normal;
  }
  .recomendada .text i {
    margin-right: 5px;
  }

  @media screen and (min-width: 768px) {
    .BusquedasRecomendas .title {
      background-image: url(https://cdn2.infocasas.com.uy/web/5c2d0c590385b_infocdn__mapay.jpg);
    }
    .BusquedasRecomendas .title:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(77, 183, 183, 0.6);
      z-index: 0;
    }
  }

  @media screen and (max-width: 980px) {
    .BusquedasRecomendas {
      display: none;
    }
    .recomendada {
      flex-basis: 49%;
    }
    .recomendada:last-child {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    .recomendada {
      flex-basis: 100%;
    }
    .recomendada:last-child {
      display: block;
    }
    .BusquedasRecomendas .title h2 {
      font-size: 20px;
    }
    .recomendadas-container {
      padding: 10px 0px 45px;
    }
  }
`;
