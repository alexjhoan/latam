// Estilos BlockCollapse

import css from "styled-jsx/css";

export default css`
  #blankMenu {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    z-index: 9999;
    display: block;
    top: 0;
  }
  #nav li .publicacion {
    border-right: solid 1px #ddd;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    float: left;
    height: 230px;
    padding: 20px 10px;
    position: relative;
    text-align: center;
    vertical-align: top;
    width: 150px;
  }
  .appSection {
    display: none;
  }
  .promoAppiOS .contBtns a img {
    width: 100%;
    max-width: 85px;
    height: auto;
  }
  .promoAppiOS .contBtns {
    float: left;
    width: 85px;
    margin-left: 13px;
    margin-top: 2px;
  }
  .promoAppiOS .ctrans {
    float: left;
    background: url(https://cdn2.infocasas.com.uy/web/59774bad0fa1d_infocdn__cel_pie_opti.png)
      no-repeat;
    width: 34px;
    height: 66px;
  }

  ul#TopSesion {
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    -webkit-padding-start: 0px;
    margin: 0 auto;
    margin-top: 20px;
    padding-left: 0px;
  }
  li.avatarUserHeader {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    cursor: pointer;
    flex-basis: calc(100% - 38px);
    margin: 0px 11px;
  }
  span.botonIniciarSesion {
    background-color: #4db7ad;
    color: #fff;
    padding: 12px 10px;
    font-size: 17px;
    cursor: pointer;
    display: block;
    width: 100%;
    border-radius: 6px;
    text-align: center;
  }
  span.botonRegistarse {
    background-color: #4db7ad;
    color: #fff;
    padding: 12px 10px;
    font-size: 17px;
    cursor: pointer;
    display: block;
    width: 100%;
    border-radius: 6px;
    text-align: center;
    margin-top: 10px;
  }

  .menuSection {
    font-size: 16px;
    display: flex;
    flex-direction: column;
  }
  #nav {
    position: relative;
    right: inherit;
    top: inherit;
  }
  #mobileMenu #nav {
    float: none;
    height: auto;
    padding: 0px 0px 0px 0px;
    text-align: left;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }

  #mobileMenu #nav li {
    border-bottom: 1px solid #ddd;
    float: none;
    height: auto;
    line-height: 50px;
    min-height: 50px;
    text-align: left;
    width: 100%;
    border-right: 0px;
    border-left: 0px !important;
    order: 5;
  }
  #nav li a {
    color: #77787b;
    padding: 0 15px 0 15px;
    display: block;
    text-decoration: none;
    transition: all 0.35s ease;
  }
  #nav li a {
    padding: 0 11px 0 11px;
  }

  .promoAppiOS {
    float: left;
    width: 100%;
    margin-bottom: 25px;
    margin-top: 15px;
  }
  li.cerrarSesion {
    border-bottom: 1px solid #ddd;
    float: none;
    height: auto;
    line-height: 50px;
    min-height: 50px;
    width: 100%;
    text-transform: none;
    padding: 0px 10px;
    box-sizing: border-box;
  }
  li.cerrarSesion a {
    padding: 0px 11px;
  }

  @media screen and (max-width: 980px) {
    .logoApp {
      display: block;
      width: 80%;
      margin: 0 auto;
      max-width: 55px;
    }
    .logoApp img {
      width: 100%;
      max-width: 75px;
    }
    .promoAppiOS .mtitle {
      text-align: center;
      font-size: 14px;
      padding: 8px;
      line-height: 18px;
    }
    #mobileMenu {
      display: block;
      background-color: rgba(255, 255, 255, 1);
      height: 100%;
      overflow-y: scroll;
      position: fixed;
      top: 0px;
      width: 80%;
      z-index: 10000;
      -webkit-box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.3);
      box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.3);
    }
    #mobileMenu li .publicacion {
      border-right: 0px;
      height: 100px;
      text-align: left;
      width: 100%;
      word-break: break-word;
    }
    #mobileMenu #nav li .publicacion {
      padding: 20px 0px;
    }
    #mobileMenu li .publicacion .publi_img {
      display: inline-block;
      float: left;
      height: auto;
      max-width: 60px;
      padding-right: 2%;
      width: 30%;
    }
    #mobileMenu li .publicacion .publi_img img {
      height: auto;
      width: 100%;
      max-width: 60px;
    }
    #mobileMenu li .publicacion .publi_desc {
      bottom: 0px;
      left: 0px;
      position: inherit;
      width: 47%;
      margin-top: 20px;
      float: left;
      display: inline-block;
    }
    li.notificaciones.noSelect {
      display: none;
    }
    .promoAppiOS .ctrans {
      display: none;
    }

    #mobileMenu #nav li .publicacion {
      padding: 20px 0px;
    }
    #mobileMenu li .publicacion .publi_desc .icon-angle-right {
      display: block;
      float: right;
      font-size: 46px;
      position: absolute;
      right: -50px;
      top: -55%;
    }
    #mobileMenu #ini-s {
      display: none;
    }
    #mobileMenu #registrar-s {
      display: none;
    }
    li.notificaciones.noSelect {
      display: none;
    }
    #nav #line {
      display: none;
    }
    #mobileMenu .btn-publicar .tipo_publicacion {
      box-shadow: none;
      height: auto;
      overflow: hidden;
      position: relative;
      right: 0px;
      width: 100%;
    }
    .promoAppiOS .contBtns {
      float: none;
      margin: 0 auto;
      width: 85px;
    }
    .closeMainMenu {
      padding: 9px 7px;
      border-radius: 53px;
      background-color: #4db7ad;
      color: #fff;
      text-align: center;
      float: right;
      position: fixed;
      right: 18%;
      z-index: 10001;
      cursor: pointer;
      display: block;
      top: 75px;
      font-size: 16px;
    }
    #mobileMenu #nav li.onlyMob {
      order: 8;
    }
  }

  @media screen and (max-width: 500px) {
    .promoAppiOS .cont {
      width: 150px;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 450px) {
    .closeMainMenu {
      right: 15%;
    }
  }
`;
