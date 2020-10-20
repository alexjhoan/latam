import { useEffect, useRef } from "react";
import { nombreZonas } from "./InputBusqueda";

export default function SuggestInputBusquedaOptions({
  action,
  options,
  cursor,
  value,
  selectedzones,
  handleClick,
  handle,
}) {
  const containerRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    if (selectedRef.current != null && selectedRef.current != null) {
      containerRef.current.scrollTop =
        selectedRef.current.offsetTop > containerRef.current.clientHeight - 30
          ? selectedRef.current.offsetTop -
            containerRef.current.clientHeight +
            selectedRef.current.clientHeight
          : 0;
    }
  });

  const isSelected = (zona) => {
    const resultado = selectedzones.filter(function(obj) {
      return Number(obj.id) === Number(zona.id);
    });
    return resultado.length > 0;
  };

  const boldCoincidence = (string) => {
    return string.replace(
      new RegExp(value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""), "gi"),
      function(a, b) {
        return "<b>" + a + "</b>";
      }
    );
  };

  const setOptionText = (opt) => {
    if (opt.action == "recomendadas") {
      return Array.isArray(opt.search)
        ? nombreZonas(opt.search)
        : opt.search.name + " (Departamento)";
    }

    return (
      opt.name +
      (typeof opt.estate != "undefined"
        ? ", " + opt.estate.name
        : " (Departamento)")
    );
  };

  return (
    <div className="suggest">
      {(options[0].action == "selector" && value.length <= 0) ||
      options[0].action == "recomendadas" ? (
        <div className="title">
          {options[0].action == "recomendadas"
            ? "Busquedas Recientes"
            : "Zonas Seleccionadas"}
        </div>
      ) : null}
      <div
        className={
          "sugest-container " +
          options[0].action +
          (options[0].action == "selector" && value.length <= 0
            ? " withTitle"
            : "")
        }
        ref={containerRef}
      >
        {options.map((opt, i) => {
          return (
            <div
              tabIndex={100 + i}
              ref={cursor === i ? selectedRef : null}
              className={
                (cursor == i ? "search selected " : "search ") +
                (opt.action == "selector" ? "option" : opt.action)
              }
              key={"option_input_busqueda_" + opt.action + "_" + i}
              onClick={() => handleClick(i)}
              title={
                opt.action == "string"
                  ? "Buscar inmuebles relacionados a " + opt.search
                  : setOptionText(opt)
              }
            >
              {opt.action == "selector" ? (
                <div className={isSelected(opt) ? "check show" : "check"}>
                  <i className="icon-ok-2"></i>
                </div>
              ) : null}

              {opt.action == "recomendadas" ? (
                <span className="text">{setOptionText(opt)}</span>
              ) : null}

              {opt.action == "string" ? (
                <span className="text">
                  Buscar inmuebles relacionados a <b>{opt.search}</b>
                </span>
              ) : null}

              {opt.action == "selector" || opt.action == "list" ? (
                <span
                  className="text"
                  dangerouslySetInnerHTML={{
                    __html: boldCoincidence(setOptionText(opt)),
                  }}
                ></span>
              ) : null}

              {opt.action == "string" || opt.action == "recomendadas" ? (
                <i className="icon-search-1"></i>
              ) : null}
            </div>
          );
        })}
      </div>

      {options[0].action == "selector" ? (
        <div className="botonesSuggest">
          <div
            tabIndex={98}
            className="aceptar"
            onClick={() => handle(selectedzones, true, false)}
          >
            Aceptar
          </div>
          <div
            tabIndex={99}
            className="deseleccionar"
            onClick={() => handle([], false, false)}
          >
            o deseleccionar todas
          </div>
        </div>
      ) : null}
    </div>
  );
}
