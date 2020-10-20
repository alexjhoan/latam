// Estilos Noticias Old
import theme from "../theme.js";
import css from "styled-jsx/css";

export default css`
  a {
    text-decoration: none;
    color: ${theme.colors.text};
  }
  .Noticia {
    padding: 0px 10px;
    cursor: pointer;
    text-decoration: none;
  }
  .Noticia .imageContainer {
    height: 140px;
    width: 100%;
    margin-bottom: 15px;
    overflow: hidden;
  }
  .Noticia img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: none;
    transition: transform ease 300ms;
  }
  :global(.slick-slide .Noticia img) {
    width: 100%;
  }
  .Noticia img:hover {
    transform: scale(1.1);
  }
  .Noticia .date {
    width: 100%;
    height: auto;
    display: block;
    font-size: 14px;
    position: relative;
    font-weight: lighter;
    color: #666;
    text-transform: capitalize;
  }
  .Noticia .title {
    width: 100%;
    float: left;
    font-size: 20px;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    color: #444;
    overflow: hidden;
    margin: 6px 0px 10px;
    height: 3em;
  }
  .tag {
    color: ${theme.colors.primary};
    font-size: 13px;
    text-decoration: none;
    font-weight: 500;
  }
  .tag a {
    text-decoration: none;
    color: ${theme.colors.primary};
  }
  .tag a:hover {
    color: ${theme.colors.primaryHover};
    text-decoration: underline;
  }
`;
