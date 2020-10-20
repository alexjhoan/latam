import Link from "next/link";

import LinkBoxStyles from "../styles/components/LinkBox";
import BlockCollapse from "./BlockCollapse";
import ImagenOptimizada from "./ImagenOptimizada";

export default function LinkBox(props) {
  const headerItem = (
    <div className="headerCollapse">
      {props.imagen != null ? (
        <ImagenOptimizada src={props.imagen} alt={props.title} />
      ) : null}
      <span>{props.nombre}</span>
    </div>
  );

  return (
    <React.Fragment>
      <div className={"LinkBox " + props.slug}>
        <BlockCollapse titulo={headerItem}>
          {props.links.map((item, index) => (
            <a
              className="itemLink"
              title={item.title}
              href={item.url}
              key={"mas_buscados_" + index}
            >
              <span>{item.title}</span>
            </a>
          ))}
        </BlockCollapse>
      </div>
      <style jsx>{LinkBoxStyles}</style>
    </React.Fragment>
  );
}
