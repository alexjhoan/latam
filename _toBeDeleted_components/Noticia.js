import NoticiaStyles from "../styles/components/Noticia.js";
import ImagenOptimizada from "./ImagenOptimizada";
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const Noticia = ({ noticia }) => {
  const formatDate = date => {
    const fecha = new Date(date.replace(/\-/g,"/"));
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const day = fecha.getDate();
    return day + " " + months[month] + ", " + year;
  };

  return (
    <React.Fragment>
      <div className="Noticia">
        <a href={"/blog/" + noticia.slug}>
          <div className="imageContainer">
            <ImagenOptimizada
              src={noticia.image}
              alt={noticia.title}
              resize={"inside"}
            />
          </div>
          <div className="NoticiaBody">
            <span className="date">
              Fecha:&nbsp;
              {formatDate(noticia.created)}
            </span>
            <p className="title">{noticia.title}</p>
          </div>
        </a>
        {noticia.tags.map(function(item, i) {
          return (
            <span className="tag" key={noticia.id + "_tag_" + item.slug}>
              <a href={item.url} title={item.slug}>
                {item.slug}
              </a>
              {i < noticia.tags.length - 1 ? ", " : ""}
            </span>
          );
        })}
      </div>

      <style jsx>{NoticiaStyles}</style>
    </React.Fragment>
  );
};

export default Noticia;
