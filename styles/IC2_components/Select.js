// Estilos Select Busqueda
import theme from "../IC2_theme";
import css from "styled-jsx/css";

export default css`
  .dropdown-container {
    height: 100%;
    position: relative;
    font-size: ${theme.fontSizes.text}px;
    color: ${theme.colors.text};
    line-height: 20px;
    width: 100%;
    min-width: 170px;
  }
  .dropdown-container i.icon-angle-down {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    font-size: 20px;
  }
  .dropdown-container select {
    opacity: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 0px;
    width: 100%;
    z-index: -1;
  }
  .header {
    position: relative;
    background: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 5px 30px 5px 7px;
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
    user-select: none;
  }
  .border .header {
    border: 1px solid ${theme.colors.border};
  }
  .borderRadius .header {
    border-radius: ${theme.borderRadius}px;
  }
  .header span {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: ${theme.fontSizes.text}px;
    color: ${theme.colors.text};
  }
  .header .placeHolder {
    opacity: 0.8;
  }
  .dropdown {
    height: 0px;
    opacity: 0;
    background: white;
    position: relative;
    z-index: 10;
    // max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0px 4px 10px -4px rgba(0, 0, 0, 0.8);
    border-top: 1px solid #dddddd;
    transition: all ease 300ms;
  }
  .dropdown .option {
    display: flex;
    padding: 6px 10px;
    display: none;
    align-item: center;
    background: white;
    color: ${theme.colors.textLight};
    font-size: 15px;
    font-weight: 300;
    transition: all ease 300ms;
    cursor: pointer;
  }
  .dropdown .option span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dropdown .option:hover {
    background: ${theme.colors.text};
    color: white;
  }

  .dropdown .option .check {
    min-width: 16px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    display: none;
  }
  .dropdown .option.checked .check {
    display: block;
  }
  .multiple .dropdown .option .check {
    display: block;
    border: 1px solid #ccc;
  }
  .multiple .dropdown .option.checked .check {
    border: 1px solid #ccc;
  }
  .dropdown .option i {
    display: none;
    opacity: 0;
    width: 0;
    font-size: 10px;
    transition: opacity ease 300ms, width ease 300ms;
  }
  .multiple .dropdown .option i {
    position: relative;
    top: -2px;
    left: 1px;
  }
  .dropdown .option.checked i {
    display: block;
    opacity: 1;
    width: auto;
  }
  .dropdown.open {
    height: auto;
    opacity: 1;
  }
  .dropdown.open .option {
    display: flex;
  }

  @media screen and (max-width: ${theme.breakPoints.lg}px) {
    .dropdown-container {
      min-width: auto;
      width: 100%;
    }
    .dropdown-container select {
      font-size: 14px;
      min-width: 130px;
      z-index: 10;
      opacity: 0;
      height: 100%;
    }
  }
  @media screen and (max-width: ${theme.breakPoints.sm}px) {
    .dropdown-container select {
      min-width: 100%;
      padding-right: 25px;
      border-radius: 0 4px 4px 0;
      appearance: none;
      background: #fff;
    }
  }
`;
