// Estilos Footer
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  footer {
    background-color: #4d4d4d;
    color: #ffffff;
    padding: 60px 0 25px 0;
    font-weight: 500;
    float: left;
    text-align: center;
    width: 100%;
  }
  footer .layout-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  footer .col4 {
    width: 20%;
    padding: 0 0 40px 0px;
    box-sizing: border-box;
    text-align: left;
  }
  footer .promoAppiOS {
    float: left;
    width: 100%;
    margin-bottom: 25px;
  }
  .promoAppiOS .mtitle {
    font-size: 17px;
    margin-bottom: 5px;
    display: inline-block;
  }
  .promoAppiOS .ctrans {
    float: left;
    background: url(https://cdn2.infocasas.com.uy/web/59774bad0fa1d_infocdn__cel_pie_opti.png)
      no-repeat;
    width: 34px;
    height: 66px;
  }
  .promoAppiOS .contBtns {
    float: left;
    width: 85px;
    margin-left: 13px;
    margin-top: 2px;
  }
  .promoAppiOS .contBtns a {
    display: block;
    margin-top: 7px;
  }
  .promoAppiOS .contBtns a:first-of-type {
    margin-top: 0;
  }
  .promoAppiOS .contBtns a :global(img) {
    width: 100%;
    max-width: 85px;
    height: auto;
  }
  .top {
    margin-bottom: 10px;
  }
  .banderas .bandera {
    margin-right: 6px;
  }
  .banderas .bandera :global(img) {
    width: 28px;
    border-radius: 20px;
    box-shadow: 0px 1px 2px #2b2a2a;
  }
  footer :global(.uyNatural) {
    margin-top: 20px;
    height: 40px;
  }

  h2 {
    display: block;
    font-size: 14px;
    padding-bottom: 5px;
    font-weight: normal;
    line-height: 20px;
  }
  .list {
    display: flex;
    flex-direction: column;
    max-width: 200px;
  }
  .list a {
    font-size: 14px;
    color: #c5c5c5;
    text-decoration: none;
    display: block;
    font-weight: lighter;
    padding: 5px 0;
    margin-top: 4px;
  }
  .list a:hover {
    opacity: 0.5;
    text-decoration: underline;
  }
  .list a i {
    margin-right: 5px;
    opacity: 0.5;
    position: relative;
    left: -5px;
    font-size: 14px;
  }
  p {
    display: block;
    font-size: 14px;
    color: #c5c5c5;
    line-height: 1.2;
    margin-bottom: 10px;
    font-weight: 300;
  }
  .goTop {
    cursor: pointer;
    background: none;
    text-indent: 0;
    color: #fff;
    width: 34px;
    height: 34px;
    border: 1px solid #fff;
    border-radius: 100%;
    text-align: center;
    margin-top: -25px;
    transition: all 0.25s ease;
    line-height: 34px;
    display: inline-block;
  }
  .goTop:hover {
    background: #fff;
  }
  .goTop i {
    font-size: 21px;
    // vertical-align: middle;
    text-align: center;
    padding-top: 0;
    display: inline-block;
    position: relative;
    top: -1px;
  }
  .goTop:hover i {
    color: #4d4d4d;
  }

  @media screen and (max-width: 1180px) {
    footer .layout-container {
      display: block;
      text-align: center;
    }
    footer .promoAppiOS {
      display: none;
    }
    footer .col4 {
      width: 95%;
      float: none;
      min-height: 40px;
      margin: 0 auto;
      text-align: center;
    }
    .links h2 {
      display: none;
    }
    .banderas .bandera {
      margin: 0 5px;
    }
    .uyNatural {
      margin-top: 20px;
      height: 40px;
    }
    .list {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      max-width: 100%;
    }
    .list a {
      padding: 2% 5px;
    }
    input[type="submit"] {
      max-width: 100%;
    }
    .inputs input {
      padding: 13px 10px;
      padding-left: 30px;
    }
    h2 {
      font-size: 16px;
      padding-bottom: 6px;
      font-weight: bold;
      line-height: 22px;
    }
  }
`;
