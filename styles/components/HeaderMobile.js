// Estilos Barra Obra Nueva

import css from "styled-jsx/css";

export default css`
  #mobileTop {
    display: none;
  }

  .notificaciones_ball {
    background-color: #ff5a5f;
    color: #fff;
    border-radius: 12px;
    width: auto;
    min-width: 8px;
    height: 13px;
    padding: 1px 4px;
    position: absolute;
    text-align: center;
    font-weight: bold;
    top: 3px;
    right: 3px;
    line-height: 14px;
    font-size: 12px;
  }

  #topSearch {
    display: none;
  }

  @media screen and (max-width: 980px) {
    #mobileTop {
      background-color: #fff;
      height: 51px;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 999;
      border-bottom: 1px solid #dbdbdb;
      display: block;
    }
    #mobileTop .contentInnerTop {
      width: 96%;
      margin: 0 auto;
      height: 50px;
    }
    .mobileLogo {
      height: 35px;
      margin-top: 9px;
      width: 110px;
      cursor: pointer;
      float: left;
    }
    .mobileLogo img {
      float: left;
      height: auto;
      max-width: 110px;
      width: 100%;
    }
    #mobileTop .icon-menu {
      float: right;
      font-size: 29px;
      margin-top: 15px;
      color: #969696;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 650px) {
    #mobileTop .contentInnerTop {
      width: 96%;
    }
  }
`;
