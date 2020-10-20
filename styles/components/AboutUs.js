// Estilos AboutUs Old
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  @keyframes FadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .AboutUs {
    padding: 50px 0px;
    background-color: #f7f9f9;
    border-top: 1px solid #e6e6e6;
  }
  .AboutUs h2 {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 80px;
    font-size: 33px;
    text-align: center;
    position: relative;
    font-weight: lighter;
    color: ${theme.colors.text};
  }
  .AboutUs h2:after {
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
  .about-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .about-container .contentQuienesSection,
  .about-container .contentBlock {
    width: 50%;
    min-height: 530px;
  }
  .about-container .contentQuienesSection {
    opacity: 0;
    animation: FadeIn 600ms ease 1 forwards;
  }
  .about-container :global(img.logoQuienes) {
    width: 100%;
    max-width: 200px;
    margin-bottom: 20px;
  }
  p.textoQ {
    font-size: 15px;
    line-height: 18px;
    color: ${theme.colors.text};
    width: 82%;
  }

  .menuQuienes {
    font-size: 18px;
    width: 80%;
    margin-top: 50px;
    margin-left: 0px;
  }
  .menuQuienes .open_btn {
    margin-bottom: 15px;
    width: 100%;
    border-bottom: 1px solid #b3b3b3;
    list-style: none;
    padding-bottom: 10px;
    cursor: pointer;
    transition: opacity 3s ease-in-out;
    -moz-transition: opacity 3s ease-in-out;
    -webkit-transition: opacity 3s ease-in-out;
    -webkit-font-smoothing: antialiased;
    color: ${theme.colors.text};
  }
  .menuQuienes .open_btn.active,
  .menuQuienes .open_btn:hover {
    font-weight: 600;
    border-bottom: 2px solid #4db7ad;
  }
  .menuQuienes .open_btn i {
    float: right;
    transition: opacity 3s ease-in-out;
  }
  .contentQuienesSection :global(img.imgContentQuienes) {
    width: 100%;
    max-width: 515px;
    max-height: 260px;
    object-fit: contain;
    object-position: center;
  }
  .tituloSectionQuienes {
    font-size: 30px;
    font-weight: 100;
    color: #4d4d4d;
    width: 100%;
    text-align: center;
    padding-bottom: 45px;
  }
  .contentQuienesSection p {
    font-size: 13px;
    line-height: 17px;
    margin: 30px 0px 20px;
  }
  .extraLinks {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .extraLinks a,
  .extraLinks div {
    margin-right: 10px;
  }
  .extraLinks a :global(img) {
    width: 80px;
  }
  .extraLinks a:first-child :global(img) {
    width: 40px;
  }

  .banderas {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .banderas :global(img) {
    margin-left: 10px;
    width: 28px;
    border-radius: 20px;
    box-shadow: 0px 1px 2px #888888;
  }
  @media screen and (max-width: 1180px) {
    .AboutUs {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
  }
`;
