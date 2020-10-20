// Estilos BlockCollapse

import css from "styled-jsx/css";

export default css`
  .BlockCollapseHeader h5 {
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 10px;
  }
  .BlockCollapseHeader i {
    display: none;
  }
  .BlockCollapseBody {
    height: auto;
    opacity: 1;
  }
  @media screen and (max-width: 1180px) {
    .BlockCollapse {
      width: 100%;
      border-bottom: 1px solid #b3b3b3;
    }
    .BlockCollapseHeader {
      background-color: white;
      width: 100%;
      padding: 12px 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      //   border-bottom: 1px solid #b3b3b3;
      cursor: pointer;
      position: relative;
      z-index: 2;
    }
    .BlockCollapseHeader h5 {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 0px;
    }
    .BlockCollapseHeader i {
      display: block;
      font-size: 20px;
    }
    .BlockCollapseBody {
      padding: 0px 10px;
      height: 0px;
      opacity: 0;
      transition: height 200ms ease, opacity 300ms ease;
    }
    .open .BlockCollapseBody {
      height: auto;
      opacity: 1;
    }
  }
`;
