import InputBusquedaStyle from "../styles/components/InputBusqueda.js";
import Tooltip from "./Tooltip.js";
import SuggestInputBusquedaOptions from "./SuggestInputBusquedaOptions.js";
import SuggestInputBusquedaTextSuggest from "./SuggestInputBusquedaTextSuggest.js";
import WindowEventListener from "./WindowEventListener.js";
import ErrorMessage from "./errorMessage.js";
import {
  QUERY_SIGN_UP_MODAL,
  TYPENAME_SIGN_UP_MODAL
} from "../shared-components/ApolloResolvers/SignUpModal";

import {gql} from "@apollo/client";
import { useQuery } from "react-apollo";
import { useState, useRef, useEffect } from "react";
import { handleApolloError } from "../lib/apollo";

const ESTATES_QUERY = gql`
  query estates {
    estates(first: 30, page: 1) {
      data {
        id
        name
        neighborhoods {
          id
          name
        }
      }
    }
  }
`;

function InputBusqueda(props) {
  let options = [];

  const { data, loading, error } = useQuery(ESTATES_QUERY);
  const { data: signUpModal, loading: load, error: err } = useQuery(
    QUERY_SIGN_UP_MODAL
  );

  const [open, toggleOpen] = useState(false);
  const [cursor, changeCursor] = useState(-1);
  const textInput = useRef(null);
  const node = useRef(null);

  const onInputBlur = event => {
    if (
      event.relatedTarget == null ||
      !node.current.contains(event.relatedTarget)
    ) {
      let params = props.selectedzones;
      if (props.selectedestate != null && props.selectedzones.length == 0) {
        params = props.selectedestate;
      }
      handleChangeZona(params, true, false);
    } else {
      focus();
    }
  };

  const handleEnterPress = event => {
    if (event.code === "Enter") {
      if (
        typeof signUpModal != "undefined" &&
        !signUpModal[TYPENAME_SIGN_UP_MODAL].open &&
        !open &&
        ((props.selectedzones != null && props.selectedzones.length > 0) ||
          props.value.length > 0)
      ) {
        props.doStartSearch(true);
      }
      event.preventDefault();
    }
  };
  const removeFocus = () => textInput.current.blur();
  const focus = () => textInput.current.focus();
  const selectInputText = () => textInput.current.select();

  WindowEventListener("keydown", handleEnterPress, false);

  useEffect(() => {
    if (open) {
      if (props.selectedestate != null && props.selectedzones.length < 0)
        handleChangeZona([], false, false);
      else if (props.selectedestate != null) props.onChange("");
      focus();
    } else {
      changeCursor(-1);
      removeFocus();
    }
  }, [open]);

  if (error) {
    if (handleApolloError(error)) return null;
  }

  const addSelectedZones = zona => {
    let res = [...props.selectedzones];
    let indice = res.findIndex(element => {
      return Number(element.id) === Number(zona.id);
    });
    if (indice >= 0) res.splice(indice, 1);
    else res.push(zona);
    return res;
  };

  /*
    Filtra estates por el string de busqueda.
    Devuelve un array con todos lo neighborhoods que contienen en su nombre o en el nombre del estado el string de busqueda.
  */
  const filterSearch = () => {
    const search = normalizarTexto(props.value);
    let filtered = [];

    data.estates.data.forEach(estate => {
      let newEstate = {
        id: estate.id,
        name: estate.name,
        __typename: estate.__typename
      };

      if (
        normalizarTexto(estate.name + "(Departamento)").indexOf(search) >= 0
      ) {
        filtered.push({ ...newEstate, action: "list" });
      }

      estate.neighborhoods.forEach(neighbor => {
        const newNeighbor = {
          ...neighbor,
          estate: { ...newEstate },
          action: props.selectedzones.length > 0 ? "selector" : "list"
        };
        if (
          normalizarTexto(newNeighbor.name + newNeighbor.estate.name).indexOf(
            search
          ) >= 0
        )
          filtered.push(newNeighbor);
      });
    });

    if (props.selectedzones.length > 0) {
      // si hay zonas seleccionadas filtro filteredNeighborhoods por estado de la ya seleccionada
      filtered = filtered.filter(function (n) {
        return (
          typeof n.estate != "undefined" &&
          Number(n.estate.id) == Number(props.selectedestate.id)
        );
      });
    }
    return filtered;
  };
  /*
    modifica zonas seleccionadas al hacer click en el boton de "aceptar".
    tambien guarda la primer zona que se selecciona.
  */
  const handleChangeZona = (zona, close, search) => {
    let selectedZones, selectedEstate;
    let inputText = props.value;

    if (Array.isArray(zona)) {
      selectedEstate = zona.length > 0 ? zona[0].estate : null;
      selectedZones = zona;
    } else if (typeof zona.estate != "undefined") {
      // selecciono zona
      selectedEstate = { ...zona.estate };
      delete zona.estate;
      zona["action"] = "selector"; // pasa a esa accion (sino, queda con action = list)

      // agrego o elimino la zona seleccionada al array de selectedzones
      selectedZones = addSelectedZones(zona);

      // si deselecciono haciendo click, en el caso que no quede nunguna zona seleccionada tengo que deseleccionar el estado tambien
      if (selectedZones.length == 0) selectedEstate = null;
    } else {
      // selecciono estado
      selectedEstate = zona;
      selectedZones = [];
    }

    if (typeof close != "undefined" && close) {
      // cierro el dropdown
      if (selectedZones.length > 0) {
        inputText = nombreZonas(selectedZones);
      } else if (selectedEstate != null) {
        inputText = selectedEstate.name + " (Departamento)";
      }
    } else {
      // no cierro el dropdowne
      if (selectedZones.length == 0 && selectedEstate == null) {
        inputText = "";
      }
      selectInputText();
    }

    props.onChange(inputText, selectedZones, selectedEstate, search);
    if (typeof close != "undefined" && close) toggleOpen(false);
    else focus();
  };

  const handleOptionClick = index => {
    switch (options[index]["action"]) {
      case "recomendadas":
        handleChangeZona(options[index].search, true, true);
        break;
      case "selector":
        handleChangeZona(options[index], false, false);
        break;
      case "list":
        handleChangeZona(options[index], true, false);
        break;
      case "string":
        handleChangeZona([], true, true);
        break;
    }
  };

  const arrowSearch = e => {
    if (!open) toggleOpen(true);

    if (e.keyCode === 27) {
      let params = props.selectedzones;
      if (props.selectedestate != null && props.selectedzones.length == 0)
        params = props.selectedestate;
      handleChangeZona(params, true, false);
      changeCursor(-1);
    } else {
      if (e.keyCode === 38 && cursor >= 0) {
        changeCursor(cursor - 1);
      } else if (e.keyCode === 40) {
        changeCursor(cursor >= options.length - 1 ? 0 : cursor + 1);
      } else if (e.keyCode === 13 && cursor >= 0) {
        e.stopPropagation();
        e.preventDefault();
        handleOptionClick(cursor);
      } else if (
        e.keyCode === 13 &&
        cursor < 0 &&
        (props.selectedzones.length > 0 ||
          props.selectedestate != null ||
          props.value.length > 0)
      ) {
        e.stopPropagation();
        e.preventDefault();

        if (isMobile()) {
          let params = props.selectedzones;
          if (props.selectedestate != null && props.selectedzones.length == 0)
            params = props.selectedestate;
          handleChangeZona(params, true, false);
        } else {
          changeCursor(-1);
          props.doStartSearch(true);
        }
      }
    }
  };

  /*
    Muestra el dropdown que corresponde segun ciertas condiciones.
    Posibles Dropdowns:
    - Recomendadas (si tengo guardadas en el localstorage)
    - Texto de Sugerencia (si no tengo nada escrito y no hay recomendadas)
    - Lista de Zonas
    - Selector de multiples zonas
    - Busqueda por String
  */
  const dropdown = () => {
    const search = props.value;
    if (error) {
      return (
        <SuggestInputBusquedaTextSuggest text="Hubo un error al cargar las zonas." />
      );
    } else if (loading) {
      // no puede buscar entre los estados pq no se cargaron aun
      return <SuggestInputBusquedaTextSuggest text="Loading..." />;
    } else {
      if (search == "" && props.selectedzones.length == 0) {
        options = getRecientesFromLocalStorage();
      } else {
        options = filterSearch();
        if (options.length > 0) {
          if (props.selectedzones.length > 0 && search == "") {
            options = props.selectedzones.map(zone => {
              return { ...zone, estate: props.selectedestate };
            });
          }
          if (search.length > 3)
            options.push({ search: search, action: "string" });
        } else {
          options = [{ search: search, action: "string" }];
        }
      }

      if (options.length > 0) {
        return (
          <SuggestInputBusquedaOptions
            options={options}
            cursor={cursor}
            value={props.value}
            selectedzones={props.selectedzones}
            handleClick={handleOptionClick}
            handle={handleChangeZona}
          />
        );
      } else {
        return (
          <SuggestInputBusquedaTextSuggest text="Empieza a escribir una zona o palabra clave y selecciónala del listado de sugerencias" />
        );
      }
    }
  };

  return (
    <React.Fragment>
      <div className="rbt clearfix" ref={node}>
        <div
          className="rbt-input-hint-container"
          onClick={() => toggleOpen(true)}
        >
          <input
            title={props.value}
            onKeyDown={e => arrowSearch(e)}
            onFocus={() => {
              toggleOpen(true);
            }}
            onBlur={e => onInputBlur(e)}
            type="text"
            value={props.value}
            autoComplete="false"
            onChange={event => props.onChange(event.target.value)}
            placeholder="Buscá por ubicación o palabra clave"
            className="rbt-input-main form-control rbt-input "
            ref={textInput}
          />
          <ErrorMessage error={props.error} />

          <div
            className={
              props.selectedzones.length > 0 && !open
                ? "moreZonas show"
                : "moreZonas"
            }
            onClick={() => toggleOpen(true)}
            onTouchStart={() => focus()}
          >
            <span
              className={props.selectedzones.length > 1 ? "text hide" : "text"}
            >
              <span className="separador">|</span> Click para agregar más zonas
            </span>
            <Tooltip content="Click para agregar más zonas">
              <i className="icon-plus-circle"></i>
            </Tooltip>
          </div>
        </div>

        {open ? <div className="suggestions open">{dropdown()}</div> : null}
      </div>
      <style jsx>{InputBusquedaStyle}</style>
    </React.Fragment>
  );
}

/*
  AUXILIAR
  Devuelve el texto de las zonas seleccionadas
*/
export function nombreZonas(array) {
  array.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  let text = "";
  array.forEach((element, i) => {
    text = text + element.name;
    if (i < array.length - 1) text = text + ", ";
  });
  return text;
}

/*
  AUXILIAR
  Replaza acentos y pasa a minusculas los caracteres de un string
*/
function normalizarTexto(text) {
  return text
    .toLowerCase()
    .replace(/[áâàä]/g, "a")
    .replace(/[éêèë]/g, "e")
    .replace(/[íîìï]/g, "i")
    .replace(/[óôòö]/g, "o")
    .replace(/[úûùü]/g, "u")
    .replace(/ç/g, "c")
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(" ")
    .join("");
}

function isMobile() {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  )
    return true;
  else return false;
}

export function getRecientesFromLocalStorage() {
  let result = [];
  if (
    typeof localStorage != "undefined" &&
    typeof localStorage.getItem(
      "frontend_home_buscador_ubicaciones_recientes"
    ) != "undefined" &&
    localStorage.getItem("frontend_home_buscador_ubicaciones_recientes") != null
  ) {
    result = JSON.parse(
      localStorage.getItem("frontend_home_buscador_ubicaciones_recientes")
    );
    // result.forEach(opt => (opt["action"] = "recomendadas"));
  }

  return result;
}

export default InputBusqueda;
