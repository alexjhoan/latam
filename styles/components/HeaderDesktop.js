import css from "styled-jsx/css";

export default css`
  .flecha_header {
    height: 20px;
    overflow: hidden;
    position: absolute;
    right: 30px;
    top: -20px;
    width: 50px;
  }
  .flecha_header:before {
    background: #fff;
    box-shadow: 1px 1px 4px rgba(23, 20, 20, 0.7);
    content: "";
    height: 20px;
    position: absolute;
    top: 12px;
    width: 20px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #header .container {
    display: block;
    position: relative;
    display: inline-block;
    max-width: 1150px;
    margin: 0 auto;
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }
  #header {
    top: 0;
    width: 100%;
    border-bottom: 1px solid #fc830b;
    height: 50px;
    text-align: center;
    position: fixed;
    z-index: 1000;
    background-color: white;
    overflow: visible !important;
    left: 0;
    transition: height 300ms ease;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
  }

  /* tipo publicacion starts */

  .tipo_publicacion {
    background: #fff;
    box-shadow: 1px 1px 4px rgba(23, 20, 20, 0.52);
    display: none;
    height: 230px;
    margin-top: 30px;
    position: absolute;
    right: -20px;
    width: 600px;
  }

  .publi_img {
    display: inline-block;
    height: 154px;
    width: 114px;
  }
  .tipo_publicacion img {
    height: auto;
    width: 110px;
  }
  .publi_desc {
    bottom: 20px;
    display: inline-block;
    font-weight: bold;
    left: 20px;
    line-height: 1;
    height: 30px;
    position: absolute;
    width: 109px;
  }
  .publi_desc .icon-angle-right {
    display: none;
  }
  /* tipo publicacion ends */

  .nav2 li {
    list-style: none;
    text-transform: uppercase;
    font-size: 13px;
    height: 20px;
  }

  .nav2 li a {
    text-decoration: none;
    transition: all 0.35s ease;
    color: #4e4e4e;
    letter-spacing: 0.7px;
  }

  .nav2 li a:hover {
    text-decoration: none;
    color: #fc830b;
  }

  #header a.logo {
    position: relative;
    float: left;
    display: block;
    height: 37px;
    width: 116px;
    height: 58px;
    transition: opacity 0.35s ease, height 0.35s ease, margin-bottom 300ms ease;
  }

  /* notificaciones start */

  #header li.notificaciones {
    position: relative;
    cursor: pointer;
    font-size: 15px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .notLoginB {
    display: none;
  }

  /* notificaciones end */

  #tipo_cliente,
  #tipo_cliente-mobile {
    background: #fff;
    box-shadow: 1px 1px 4px rgba(23, 20, 20, 0.52);
    display: none;
    margin-top: 30px;
    position: absolute;
    right: -20px;
    width: 304px;
  }

  #header a.logo #realLogo {
    background-image: url(https://cdn2.infocasas.com.uy/web/59774ee1a67e6_infocdn__logo_opti.png);
    position: absolute;
    bottom: 8px;
    width: 116px;
    height: 35px;
    background-size: contain;
    background-repeat: no-repeat;

    height: 37px;
    width: 116px;
    bottom: 0px;
  }

  #header #squares {
    background-image: url(https://cdn2.infocasas.com.uy/web/596f6147ef497_infocdn__56e6c344f2bc5_infocdn__logosup.png);
    width: 90px;
    height: 29px;
    background-size: 100% 100%;
    position: absolute;
    left: 10px;
    top: -20px;
    background-repeat: no-repeat;
    top: 0px;
    opacity: 1;
    transition: all 300ms ease;
  }

  ul.nav2 {
    width: 475px;
    float: left;
    display: flex;
    justify-content: space-between;
    -webkit-padding-start: 30px;
    position: absolute;
    bottom: 1px;
    margin: 7px 0px;
    left: 120px;
  }

  #mobileTop {
    display: none;
  }

  #topSearch {
    display: none;
  }

  .fakeHeader {
    height: 50px;
  }

  @media screen and (max-width: 980px) {
    #header,
    .fakeHeader {
      display: none;
    }
  }

  @media screen and (max-width: 650px) {
    .headerDesktopOld {
      display: none !important;
    }
  }
`;
