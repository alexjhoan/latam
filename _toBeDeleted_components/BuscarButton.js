import React from "react";
import BuscadorHomeStyle from "../styles/components/BuscadorHome.js";
import Loader from "./Loader.js";

function BuscarButton({ children, ...props }) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <React.Fragment>
      <div className="submit-search-container">
        <button
          className="submit-search-input"
          type="submit"
          value="Buscar"
          ref={ref}
          disabled={props.loading}
          onClick={event => {
            event.preventDefault();
            props.doStartSearch(true);
          }}
          style={
            width && height
              ? {
                  width: `${width}px`,
                  height: `${height}px`
                }
              : {}
          }
        >
          {props.loading ? <Loader /> : children}
        </button>
      </div>

      <style jsx>{BuscadorHomeStyle}</style>
    </React.Fragment>
  );
}

export default BuscarButton;
