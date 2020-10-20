// Estilos Footer
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  .NuestrasOficinas {
    width: 100%;
    padding: 10px 0;
    height: auto;
    background-color: #f7f9f9;
    border-bottom: #e6e6e6;
  }
  .NuestrasOficinas .layout-container {
    width: 95%;
    padding: 30px 0;
  }
  .NuestrasOficinas h2 {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 80px;
    font-size: 24px;
    text-align: center;
    position: relative;
    font-weight: lighter;
    color: ${theme.colors.text};
  }
  .NuestrasOficinas h2:after {
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
  .NuestrasOficinas .office-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .NuestrasOficinas .office-container .office {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border-left: 4px solid #ff7043;
    padding: 4px 10px;
  }
  .NuestrasOficinas .office-container .office :global(img) {
    width: 110px;
    margin-right: 10px;
    border-radius: 55px;
    user-select: none;
  }
  .NuestrasOficinas .office-container .office h3 {
    font-size: 18px;
    font-weight: 300;
    color: ${theme.colors.text};
    margin-bottom: 15px;
  }
  .NuestrasOficinas .office-container .office .dato {
    font-size: 13px;
    font-weight: 300;
    margin-bottom: 7px;
    color: ${theme.colors.text};
    white-space: nowrap;
  }
  .NuestrasOficinas .office-container .office i {
    font-size: 15px;
    margin-right: 4px;
  }
  @media screen and (max-width: 1180px) {
    .NuestrasOficinas {
      border-top: none;
      border-bottom: none;
    }
  }
`;
