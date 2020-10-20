// Estilos BlockCollapse

import css from "styled-jsx/css";

export default css`
  #userLogged {
    margin-left: 9px;
    cursor: pointer;
    height: 40px;
    border-right: 0px;
    position: relative;
    width: auto;
    color: #666666;
  }
  #userLogged i.icon-angle-down {
    font-size: 13px;
    position: relative;
    top: -16px;
  }
  #userLogged .nav-tooltip {
    display: none;
    text-align: left;
    border: 1px solid #cccccc;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 0px;
    z-index: 201;
    border-radius: 3px;
    width: 175px;
    margin-top: -2px;
  }
  #userLogged:hover .nav-tooltip {
    display: block;
  }
  #userLogged .nav-tooltip:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: -8px;
    left: 24px;
    bottom: auto;
    border: 8px solid transparent;
    border-top: 0;
    border-bottom-color: rgba(0, 0, 0, 0.1);
  }

  #userLogged .nav-tooltip li {
    display: block;
    border: 0;
    float: none;
    text-align: left;
    padding: 5px 9px;
    background-color: #ffffff;
    transition: all 0.3s ease;
  }
  #userLogged a {
    display: inline-block;
  }
  #userLogged .nav-tooltip li a {
    padding: 0;
    font-size: 12px;
  }
  #userLogged .nav-tooltip li:hover {
    background-color: #eeeeee;
  }
  #userLogged i.icon-angle-down {
    font-size: 13px;
    position: relative;
    top: -16px;
  }
  li {
    height: 25px;
    line-height: 25px;
    float: left;
    border-right: 1px solid #ddd;
    text-align: center;
  }
  li a {
    color: #77787b;
    padding: 0 15px 0 15px;
    display: block;
    text-decoration: none;
    transition: all 0.35s ease;
  }
  .user-profile-image {
    height: 32px;
    width: 32px;
    border-radius: 60px;
    display: inline-block;
    position: relative;
    top: -5px;
    border: 0.17em solid #fff;
    background-position: center;
    background-image: url(https://cdn2.infocasas.com.uy/repo/img/user-profile.png);
    background-size: cover;
  }
  .user-profile-name {
    display: inline-block;
    position: relative;
    top: -16px;
    margin-left: 10px;
  }
  .notis_mobile {
    display: none;
  }
  .onlyMob {
    display: none !important;
  }

  @media screen and (max-width: 1150px) {
    li a {
      padding: 0 6px 0 6px;
    }
  }
  @media screen and (max-width: 980px) {
    #userLogged {
      height: auto;
      width: 100%;
      margin: 0px;
      order: 1;
      position: relative;
      top: 0px;
      cursor: initial;
    }
    #userLogged a {
      display: block;
      width: 100%;
      box-sizing: border-box;
      height: auto;
      line-height: initial;
    }
    #userLogged .nav-tooltip {
      position: static;
      display: block;
      width: 100%;
      border: none;
    }
    #userLogged .nav-tooltip:before {
      display: none;
    }
    #userLogged .nav-tooltip li {
      border-bottom: 0px;
      padding: 0px 9px 0 15px;
      line-height: 45px;
      min-height: 45px;
      width: auto;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    #userLogged .nav-tooltip li:hover {
      background-color: white;
      opacity: 0.75;
    }
    #userLogged .nav-tooltip li.onlyMob.titleSection {
      background-color: #f1f1f1;
      color: #6b6b6b;
      font-weight: 400;
      margin-top: 20px;
      cursor: auto;
      line-height: 30px !important;
      min-height: 30px !important;
    }
    #userLogged .nav-tooltip li.onlyMob.titleSection:hover {
      opacity: 1;
      background-color: #f1f1f1;
    }
    #userLogged .nav-tooltip li a {
      font-size: 16px;
      margin-bottom: 0px;
    }
    li {
      float: none;
      height: auto;
      line-height: 50px;
      min-height: 50px;
      text-align: left;
      width: 100%;
      border-right: 0px;
      border-left: 0px;
      order: 5;
    }
    li a {
      padding: 0 11px 0 11px;
    }

    .imgAsBg {
      -webkit-background-size: cover;
      background-size: cover;
      background-position: 0 0;
    }
    .user-profile-name {
      font-size: 16px;
      top: -12px;
    }
    .user-profile-image {
      height: 32px;
      width: 32px;
      border-radius: 60px;
      display: inline-block;
      position: relative;
      top: -5px;
      border: 0.17em solid #fff;
      background-position: center;
      background-image: url(https://cdn2.infocasas.com.uy/repo/img/user-profile.png);
    }
    .notificaciones_ball {
      background-color: #ff5a5f;
      color: #fff;
      border-radius: 12px;
      width: auto;
      min-width: 9px;
      height: 13px;
      padding: 1px 3px;
      position: absolute;
      text-align: center;
      font-weight: bold;
      top: -1px;
      left: 50%;
      line-height: 14px;
      font-size: 12px;
    }
    a.bell-alt {
      margin-top: 7px;
    }
    .icon-bell-alt {
      color: #fff;
      text-shadow: -1px 0 #77787b, 0 1px #77787b, 1px 0 #77787b, 0 -1px #77787b;
      font-size: 21px;
    }
    .user-profile-image {
      top: 0;
    }
    i.icon-angle-down.avoid {
      display: none;
    }
    .notis_mobile {
      float: right;
      display: inline-block;
      z-index: 1;
    }
    .onlyDeskTop {
      display: none !important;
    }
    .onlyMob {
      display: flex !important;
    }
  }
`;
