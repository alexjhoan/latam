// Estilos Buscador Home
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  .filters-form {
    width: 100%;
    padding: 0 45px;
    position: absolute;
    top: calc(50% - 100px);
    left: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    z-index: 9;
    transform: translateY(-50%);
  }
  .filters-form form {
    padding: 45px 0px;
    margin-top: 40px;
    max-width: 910px;
    position: relative;
  }
  .filters-form form h1 {
    font-size: 40px;
    color: #fff;
    line-height: 40px;
    margin: 0 auto;
    max-width: 620px;
    text-shadow: 0px 2px 5px rgba(0,0,0,0.5);
    font-weight: 300;
    text-align: center;
  }
  .filters-form form .filters-group-top {
    margin: 0px;
    padding: 20px 10px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
    margin-top: 35px;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    padding-bottom: 35px;
  }
  .filters-form form .filters-group-top .operation-type-container{
    width: 170px;
    margin-right: 8px;
  }
  .filters-form form .filters-group-top .operation-type-container .operation-type-menu {
    display: none;
  }  
  .filters-form form .filters-group-top .operation-type-container .operation-type-select{
    height: 50px;
  }
  .filters-form form .filters-group-top .property-type-container {
    height: 50px;
    margin-right: 8px;
    width: 170px;
  }
  .filters-form form .filters-group-top .property-type-container.hide{
    display: none;
  } 
  .dropdown-container {
    height: 100%;
    position: relative;
  }
  .dropdown-container i.icon-angle-down {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    font-size: 20px;
  }
  .dropdown-container select {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 10px;
    padding-right: 32px;
    border-radius: 0;
    text-indent: 1px;
    text-overflow: "";
    cursor: pointer;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: #fff;
    font-size: 15px;
    color: ${theme.colors.text}
    text-overflow: ellipsis;
  } 
  .filters-form form .filters-group-top .search-box-container {
    height: 50px;
    flex-grow: 1;
  }
  .filters-form form .filters-group-top .submit-search-container .submit-search-input {
    background-color: ${theme.colors.primary};
    color: white;
    height: 100%;
    min-width: 95px;
    margin-left: 10px;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    font-weight: 600;
  }
  .filters-form form .filters-group-top .submit-search-container .submit-search-input:hover{
    background-color: ${theme.colors.primaryHover};
  }
  .filters-form form .filters-group-top .search-date-container{
    display: flex;
    margin-left: 8px;
    width: 280px;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .filters-form form .filters-group-top .search-date-container.hide{
    display: none;
  }
  .temporadas-box-container {
    height: 100%;
    width: 100%;
  }
  .button_byTemporada {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0px;
    margin-top: 3px;
    cursor: pointer;
    font-weight: bold;
    color: white;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
  }
  .icono-calendario {
    background: url(https://cdn2.infocasas.com.uy/web/5b4513394f3a8_infocdn__icono_20-_20calendario.png)
      no-repeat;
    width: 20px;
    height: 19px;
    display: inline-block;
    margin-right: 5px;
    position: relative;
    top: -1px;
  }
  .icono-sol {
    background: url(https://cdn2.infocasas.com.uy/web/5b4512f7ab403_infocdn__icono_20-_20sol.png)
      no-repeat;
    width: 19px;
    height: 19px;
    display: inline-block;
    margin-right: 5px;
    position: relative;
    top: -1px;
  }
  @media screen and (max-width: 980px){
    .filters-form{
      padding: 0;
      padding-bottom: 100px;
      position: relative;
      top: 0px;
      left: 0px;
      transform: none;
    }
    .filters-form form{
      max-width: 100%;
      margin-top: 0px;
      padding: 100px 0px 30px;
      padding: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .filters-form form h1{
      font-size: 30px;
      line-height: 33px;
      max-width: 550px;
    }
    .filters-form form .filters-group-top{
      margin-top: 50px;
      padding-bottom: 45px;
      padding-top:10px
    }
    .filters-form form .filters-group-top .operation-type-container .operation-type-menu {
      display: none;
    }
    .filters-form form .filters-group-top .property-type-container, .filters-form form .filters-group-top .operation-type-container{
      margin: 4px 0;
      width: 50%;
    }
    .filters-form form .filters-group-top .operation-type-container.temporal{
      width: 100%;
    }
    .filters-form form .filters-group-top .operation-type-container :global(.dropdown-container select){
      border-radius: 4px 0px 0px 4px;
    }   
    .filters-form form .filters-group-top .operation-type-container .operation-type-select{
      display: block;
      margin-right: 4px;
    }
    .filters-form form .filters-group-top .operation-type-container.temporal .operation-type-select{
      margin-right: 0px;
    }
    .filters-form form .filters-group-top .search-box-container {
      width: 100%;
    }
    .filters-form form .filters-group-top .search-date-container {
      margin: 4px 0px 38px;
      width: 100%;
      margin-left: 0px;
    }
    .filters-form form .filters-group-top .submit-search-container {
        width: 100%;
        margin-top: 4px;
        height: 50px;
    }
    .filters-form form .filters-group-top .submit-search-container .submit-search-input {
        width: 100%;
        margin-left: 0px;
    }
  }
  @media screen and (max-width: 680px){
    .filters-form form h1{
      font-size: 24px;
      line-height: 26px;
      max-width: 95%;
    }
    .filters-form form .filters-group-top{
      margin-top: 25px;
    }
  }  @media screen and (max-width: 400px){
    .filters-form form h1{
      font-size: 20px;
      line-height: 22px;
    }
  }
`;
