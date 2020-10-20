// Estilos Select Busqueda
import css from "styled-jsx/css";

export default css`
  a {
    text-decoration: none;
    color: #fc830b;
    transition: all 0.35s ease;
  }
  #blanket {
    overflow: auto;
    position: fixed;
    width: 120%;
    height: 100%;
    z-index: 1008;
    top: 0;
    left: 0;
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1008;
    cursor: default;
    top: 0;
    left: 0;
    display: none;
    background-color: rgba(0, 0, 0, 0.85);
  }
  .centerVerticalToParent,
  .cvtp {
    position: relative;
    top: 50%;
    -ms-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .pop {
    position: absolute;
    display: none;
    margin: 0 auto;
    left: 0;
    right: 0;
    -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.21);
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.21);
    -o-box-shadow: 0 0 10px rgba(0, 0, 0, 0.21);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.21);
    padding: 30px;
    box-sizing: border-box;
  }
  .pop {
    position: absolute;
    display: none;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  #login-with-pop {
    padding: 60px;
    background-color: #fff;
    cursor: default;
    display: none;
    width: 80%;
    max-width: 450px;
    text-align: center;
    color: #666;
    border-radius: 3px;
    box-sizing: content-box;
  }
  #login-with-pop {
    padding: 60px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  login-with-pop .type_text {
    box-sizing: border-box;
    display: inline-block;
    padding: 10px;
    vertical-align: middle;
    width: calc(100% - 80px);
  }

  #login-with-pop input {
    width: 100%;
    line-height: normal;
    display: block;
    margin: 0px auto;
    border-radius: 2px;
    border: 1px solid #c4c4c4;
    padding: 10px;
    color: #565a5c;
    box-sizing: border-box;
    padding: 23px 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: 13px;
    height: 30px;
  }

  #login-with-pop .orangeHover {
    border-radius: 2px;
    border: 1px solid #c35f01;
    padding: 13px;
    margin: 13px 0;
    background-color: #fc830b;
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    width: 100%;
  }
  .orangeHover:hover {
    background-color: #df6c19 !important;
  }
  #login-with-pop span.line {
    width: 130px;
    border-bottom: solid 1px;
    height: 1px;
    display: inline-block;
    position: relative;
    top: -3px;
    border-color: #dce0e0;
  }
  #login-with-pop .type {
    font-size: 17px;
    line-height: 22px;
    color: #4d4d4d;
    font-weight: 300;
  }
  #login-with-pop .type {
    margin-bottom: 20px;
    width: 100%;
  }
  #login-with-pop .type_text {
    box-sizing: border-box;
    display: inline-block;
    padding: 10px;
    vertical-align: middle;
    width: calc(100% - 80px);
  }
  #login-with-pop .messages {
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  #login-with-pop .type span {
    font-size: 24px;
    line-height: 28px;
    font-weight: 600;
    text-align: center;
  }
  #login-with-pop .labelInput {
    display: block;
    color: #4d4d4d;
    font-weight: 600;
    font-size: 13px;
    text-align: left;
    margin-bottom: 5px;
  }
  #login-with-pop .notMe {
    display: none;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #login-with-pop #recuperar-pass {
    border-top: 1px solid #c4c4c4;
    padding: 25px 0 0;
    margin-top: 15px;
    height: 20px;
    display: flex;
    align-items center;
    justify-content: center;
  }
  #login-with-pop #recuperar-pass span{
    cursor: pointer;
  }
  #login-with-pop #olvideContraseña {
    border-top: 1px solid #c4c4c4;
    padding: 25px 0 0;
    margin-top: 15px;
    height: 20px;
    color: #3d46c0;
    font-weight: bold;
  }
  #login-with-pop span.o {
    margin: 0 5px;
    color: #82888a;
    font-weight: bold;
  }
  #login-with-pop span.o {
    color: #adadad;
    font-size: 12px;
  }
  :global(#login-with-pop .ingresar) {
    cursor: pointer;
    width: 100%;
    line-height: 32px;
    margin: 0 auto 7px auto;
    font-size: 12px;
    padding: 9px 0px;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.43;
    border-radius: 0px;
    transition: all 0.35s ease;
    border: 1px solid #c4c4c4;
  }
  :global(#login-with-pop .ingresar .text-container) {
    color: #666666;
    font-size: 15px;
    font-weight: bold;
  }
  :global(#login-with-pop .ingresar.g) {
    margin-top: 9px;
    color: #ba3c11;
    position:relative;
  }
  :global(#login-with-pop .ingresar.g:hover) {
    background-color: #fee;
    color: #ba3c11;
  }
  #login-with-pop .ingresar.g.disabled{
    cursor: default;
    transition: all 0.35s ease;
    opacity: 0.4;
  }
  #login-with-pop .ingresar.g.disabled:hover{
    opacity: 1;
  }
  #login-with-pop.pop .disabledGG_message {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.95);
    width: 100%;
    height: 100%;
    font-size: 13px;
    line-height: 14px;
    color: #646464;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    box-sizing: border-box;
    justify-content: center;
    opacity: 0;
    z-index: -1;
    transition: all 0.35s ease;
  }
  #login-with-pop .ingresar.g:hover .disabledGG_message{
    opacity: 1;
    z-index: 2;
  }
  :global(#login-with-pop .ingresar.f) {
    color: #355c94;
  }
  :global(#login-with-pop .ingresar.f:hover) {
    background-color: #eef;
    color: #355c94;
  }
  #login-with-pop a {
    cursor: pointer;
  }
  #login-with-pop #ingresoCorreoDeUsuario a {
    margin-top: 0px;
    display: inline-block;
    line-height: normal;
  }
  #login-with-pop :global(img) {
    height: auto;
    display: block;
    margin: 0 auto 15px;
    width: 35px;
  }
  #login-with-pop .ingresar i {
    font-size: 20px;
    float: left;
    margin-left: 0;
    margin-top: 0px;
    width: 31px;
    height: 34px;
    margin-top: -1px;
    margin-left: 6px;
  }
  .cerrar_consultar {
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
  #login-with-pop .cerrar_consultar {
    background-color: transparent;
    border: none;
    position: absolute;
    top: 5px;
    right: 0px;
    padding: 1px 5px;
  }
  #login-with-pop input.error {
    background-color: #fff6f6;
    border: 1px solid #f72814;
  }
  #hacerDespues {
    cursor: pointer:
    border-top: 1px solid #c4c4c4;
    padding: 30px 0 0;
    margin-top: 23px;
    color: #3d46c0;
    font-weight: bold;
  }
  #hacerDespues:hover {
    opacity: 0.9;
  }
  #hacerDespues span {
    cursor: pointer;
  }
  @media screen and (max-width: 980px) {
    #login-with-pop.pop .disabledGG_message {
      padding: 0px 50px;
    }
    #login-with-pop.pop.full {
      width: 100%;
      box-sizing: border-box;
      height: auto;
      padding-bottom: 50px;
      min-height: 100%;
      border-radius: 0;
    }
    .pop {
      top: initial;
      transform: none;
      margin: 25px auto;
    }
    .pop.full {
      width: 100%;
      max-width: none;
      height: 100%;
      margin: 0;
    }
    #login-with-pop {
      padding: 0px 20px;
    }
    #blanket {
      z-index: 10019 !important;
    }
    #login-with-pop .type {
      margin-top: 80px;
    }
    #login-with-pop .type_text {
      width: 100% ;
    }
    #login-with-pop #ingresoCorreoDeUsuario a{
      margin-top: 6px;
      line-height: 18px;
    }
  }
  @media screen and (min-width: 981px) {
    .mobile {
      display: none;
    }
  }
`;
