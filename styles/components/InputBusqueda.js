// Estilos Input Busqueda
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  .rbt {
    height: 100%;
    position: relative;
  }
  .rbt .rbt-input-hint-container {
    margin: 0;
    height: 100%;
  }
  input {
    width: 100%;
    height: 100%;
    font-size: 15px;
    font-weight: 300;
    border: none;
    padding: 0 15px;
    box-sizing: border-box;
    color: ${theme.colors.textLight};
    -webkit-appearance: none;
    -moz-appearance:    none;
    appearance:         none;
    border-radius:0;
  }
  .moreZonas {
    position: absolute;
    height: 100%;
    top: 0px;
    right: 0px;
    align-items: center;
    justify-content: flex-end;
    background: white;
    padding: 0px 7px;
    font-size: 13px;
    color: #333;
    -webkit-font-smoothing: antialiased;
    cursor pointer;
    display:none;
  }
  .moreZonas.show{
    display: flex;
  }
  .moreZonas .text {
    height: 24px;
  }
  .moreZonas .text.hide {
    display: none;
  }
  .moreZonas .separador {
    font-size: 20px;
    margin-right: 4px;
    position: relative;
    top: 1px;
  }
  .moreZonas i{
    color: ${theme.colors.secondary};
    font-size: 22px;
    margin-left: 4px;
  }
  .suggestions {
    opacity:0;
    height:0;
    background: white;
    border-radius: 0px 0px 6px 6px;
    width: 100%;
    text-align: left;
    display: block;
    position: absolute;
    top: 100%;
    border-top: solid 1px #b3b3b3;
    color: #424242;
    box-shadow: 0px 4px 10px -4px rgba(0, 0, 0, 0.8);
    max-height: 260px;
    transition: all ease 300ms;
    z-index: 11;
    overflow: hidden;
  }
  .suggestions :global(.sugest-container){
    overflow: auto;
    max-height: 260px;
  }
  .suggestions :global(.sugest-container.selector){
    max-height: 190px
  }  
  .suggestions :global(.sugest-container.recomendadas){
    max-height: 230px
  }
  .suggestions :global(.sugest-container.selector.withTitle){
    max-height: 160px
  }
  .suggestions.open{
    height: auto;
    opacity: 1;
  }
  .suggestions :global(.title) {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #b3b3b3;
    color: #333;
  }

  .suggestions :global(.search) {
    font-size: 15px;
    line-height: 18px;
    padding: 9px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${theme.colors.text};
    cursor: pointer;
  }
  .suggestions :global(.sugest-container .search.string){
    border-top: 1px solid ${theme.colors.textLight};
  }  
  .suggestions :global(.sugest-container .search.string:nth-child(1)){
    border-top:none;
  }  

  .suggestions :global(.search.option){
    justify-content: flex-start;
  }
  .suggestions :global(.search:hover),.suggestions :global(.search.selected) {
    background: ${theme.colors.textLight};
    color: white;
  }
  .suggestions :global(.search i.icon-search-1) {
    font-size: 20px;
    opacity: 0.5;
  }
  .suggestions :global(.check) {
    border: 1px solid ${theme.colors.text};
    width: 11px;
    height: 11px;
    margin-right: 10px;
    position: relative;
  }
  .suggestions :global(.check i) {
    font-size: 14px;
    position: absolute;
    top: -6px;
    left: -2px;
    color: ${theme.colors.secondary};
    display: none;
  }
  .suggestions :global(.check.show i) {
    display: block;
  }
  .suggestions :global(.botonesSuggest) {
    width: 100%;
    background: white;
    padding-top: 2px;
  }
  .suggestions :global(.aceptar) {
    width: calc(100% - 20px);
    background: ${theme.colors.secondary};
    color: white;
    padding: 6px;
    text-align: center;
    box-sizing: border-box;
    margin: 6px auto 0px;
    border-radius: 5px;
    cursor: pointer;
  }
  .suggestions :global(.aceptar:hover) {
    background: ${theme.colors.secondaryHover};
  }
  .suggestions :global(.deseleccionar) {
    color: ${theme.colors.primary};
    font-size: 14px;
    text-decoration: underline;
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
  .suggestions :global(.deseleccionar:hover) {
    color: ${theme.colors.primaryHover};
  }
  .suggestions :global(.textSuggest){
    text-align: center;
    padding: 3px 10px;
    line-height: 15px;
  }
  .suggestions :global(.search.recomendadas .text) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

  @media screen and (max-width: 980px) {
    input {
      font-size: 14px !important;
      padding: 0 9px;
    }
  }
  @media screen and (max-width: 768px) {
    .suggestions :global(.search) {
      padding: 8px 10px;
    }
    .suggestions :global(.aceptar) {
      padding: 9px 10px;
      font-size: 15px;
    }
    .suggestions :global(.deseleccionar) {
      font-size: 15px
    }
    .suggestions :global(.sugest-container){
      max-height: 200px;
    }
    .suggestions :global(.sugest-container.recomendadas){
      max-height: 170px
    }
    .suggestions :global(.sugest-container.selector){
      max-height: 140px
    }  
    .suggestions :global(.sugest-container.selector.withTitle){
      max-height: 110px
    }
  }
  @media screen and (max-width: 340px){
    .moreZonas .text{
      display:none;
    }
  }
`;
