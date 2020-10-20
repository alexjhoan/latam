import InputBusqueda from "./InputBusqueda";
import { getRecientesFromLocalStorage } from "./InputBusqueda";
import dynamic from "next/dynamic";
import SelectBusqueda from "./SelectBusqueda";
import BuscarButton from "./BuscarButton";
import BuscadorHomeStyle from "../styles/components/BuscadorHome";
import BuscarPorReferencia from "./BuscarPorReferencia";
import DateRangeBusqueda from "./DateRangeBusqueda.js";
import { showCustomMessageToast } from "./CustomMessageToast.js";

import {gql} from "@apollo/client";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { MUTATION_LOCAL_STORE, Queries } from "../shared-components/ApolloResolvers";
import { useState, useEffect } from "react";
import {
  QUERY_BUSCADOR_PROPIEDADES,
  TYPENAME_BUSCADOR_PROPIEDADES,
} from "../shared-components/ApolloResolvers/BuscadorPropiedades";
import { handleApolloError } from "../lib/apollo";

const PROPERTY_AND_OPERATION_TYPES_QUERY = gql`
  query MiConfiguration {
    configuration {
      property_types(show_in_home: true) {
        id
        plural
      }
      operation_types(show_in_home: true) {
        id
        name
        show_in_home
      }
      H1
    }
  }
`;

const SEARCH_URL = gql`
  query searchUrl($params: SearchParamsInput!) {
    searchUrl(params: $params) {
      url
    }
    error
  }
`;
let loadint;

const BuscadorHome = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const [formErrors, updateErrors] = useState({});
  const [currentBySeason, setBySeason] = useState(false);

  const [searchZones, changeSearchZones] = useState([]);
  const [estate, changeEstate] = useState(null);
  const [search, changeSearch] = useState("");

  const { data, loading, error } = useQuery(PROPERTY_AND_OPERATION_TYPES_QUERY);
  const BUSCADOR_PROPIEDADES = useQuery(QUERY_BUSCADOR_PROPIEDADES);
  const [MUTATOR_LOCAL_STORE] = useMutation(MUTATION_LOCAL_STORE);

  const [getSearchUrl, { ...rest }] = useLazyQuery(SEARCH_URL, {
    onCompleted: (dataURL) => {
      clearTimeout(loadint);
      addSearchZoneToLocalStore();
      window.location.href = dataURL.searchUrl.url;
    },
    onError: (error) => {
      setShowLoader(false);
      clearTimeout(loadint);
      handleApolloError(error);
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    return () => clearTimeout(loadint);
  }, []);

  if (error) {
    if (handleApolloError(error)) return null;
  }
  if (BUSCADOR_PROPIEDADES.loading || loading) return null;

  const { operacion, tipos, season, dates } = BUSCADOR_PROPIEDADES.data[
    TYPENAME_BUSCADOR_PROPIEDADES
  ];

  const addSearchZoneToLocalStore = () => {
    if (estate != null) {
      let new_recent_search = {
        search:
          searchZones.length > 0
            ? searchZones.map((zone) => {
              return { ...zone, estate: estate };
            })
            : estate,
        action: "recomendadas",
      };
      let old_recent_search = getRecientesFromLocalStorage();

      const foundInRecentSearchesIndex = inRecentSearches(
        new_recent_search,
        old_recent_search
      );

      if (foundInRecentSearchesIndex < 0) {
        old_recent_search.unshift(new_recent_search);
        if (old_recent_search.length > 4) old_recent_search.pop();
      } else {
        old_recent_search.splice(foundInRecentSearchesIndex, 1);
        old_recent_search.unshift(new_recent_search);
      }

      localStorage.setItem(
        "frontend_home_buscador_ubicaciones_recientes",
        JSON.stringify(old_recent_search)
      );
    }
  };
  const handleChangeDates = (start, end) => {
    MUTATOR_LOCAL_STORE({
      variables: {
        new_state: {
          dates: {
            start: start,
            end: end,
            __typename: TYPENAME_BUSCADOR_PROPIEDADES + "_dates",
          },
        },
        query: QUERY_BUSCADOR_PROPIEDADES,
      },
    });
  };
  const handleChangeSelectTipos = (value) => {
    MUTATOR_LOCAL_STORE({
      variables: {
        new_state: { tipos: value },
        query: QUERY_BUSCADOR_PROPIEDADES,
      },
    });
  };
  const handleChangeSelectOperacion = (value) => {
    MUTATOR_LOCAL_STORE({
      variables: {
        new_state: { operacion: value },
        query: QUERY_BUSCADOR_PROPIEDADES,
      },
    });
  };
  const handleChangeInput = (
    inputText,
    selectedZones,
    selectedEstate,
    search
  ) => {
    if (typeof selectedZones != "undefined") changeSearchZones(selectedZones);
    else selectedZones = [];
    if (typeof selectedEstate != "undefined") changeEstate(selectedEstate);
    else selectedEstate = null;
    changeSearch(inputText);

    if (search && (operacion[0] != 4 || selectedEstate == null)) {
      startLoading();
      getSearchUrl({
        variables: {
          params: {
            operation_type_id: operacion[0],
            property_type:
              (operacion[0] != 4 && selectedZones.length > 0) ||
                selectedEstate != null
                ? tipos
                : null,
            estate_id: selectedEstate != null ? selectedEstate.id : null,
            neighborhood_id:
              selectedZones.length > 0 ? selectedZones.map((a) => a.id) : null,
            searchstring:
              selectedZones.length > 0 || selectedEstate != null
                ? ""
                : inputText,
            season: operacion[0] == 4 && currentBySeason ? season[0] : null,
            dateFrom:
              operacion[0] == 4 && !currentBySeason ? dates.start : null,
            dateTo: operacion[0] == 4 && !currentBySeason ? dates.end : null,
          },
        },
      });
    }
  };
  const handleChangeSelectSeasons = (value) => {
    MUTATOR_LOCAL_STORE({
      variables: {
        new_state: { season: value },
        query: QUERY_BUSCADOR_PROPIEDADES,
      },
    });
  };
  const validateFormBusqueda = () => {
    let errors = {};
    if (operacion.length === 0) {
      // si no hay tipo de operacion
      errors["operacion"] = "Seleccione una operación";
    } else if (tipos.length === 0) {
      // si no hay tipo de propiedad
      errors["tipos"] = "Seleccione un tipo de propiedad";
    } else if (searchZones.length === 0 && search.length === 0) {
      // si no hay zona seleccionada
      errors["searchZones"] = "Ingrese una zona";
    }
    showErrors(errors);
    return errors;
  };
  const showErrors = (errors) => {
    updateErrors(errors);
    setTimeout(() => {
      updateErrors({});
    }, 6000);
  };
  const startLoading = () => {
    setShowLoader(true);
    // no more than 10s loading
    loadint = setTimeout(() => {
      showCustomMessageToast(
        "search-timeout", // id - avoid duplicates
        "Hubo un error al realizar la búsqueda. Vuelve a intentarlo." // message
      );
      setShowLoader(false);
    }, 15000);
  };
  const doStartSearch = (e) => {
    let errors = validateFormBusqueda();
    if (Object.keys(errors).length <= 0) {
      startLoading();
      getSearchUrl({
        variables: {
          params: {
            operation_type_id: operacion[0],
            property_type:
              operacion[0] != 4 && (searchZones.length > 0 || estate != null)
                ? tipos
                : null,
            estate_id: estate != null ? estate.id : null,
            neighborhood_id:
              searchZones.length > 0 ? searchZones.map((a) => a.id) : null,
            searchstring:
              searchZones.length > 0 || estate != null ? "" : search,
            season: operacion[0] == 4 && currentBySeason ? season[0] : null,
            dateFrom:
              operacion[0] == 4 && !currentBySeason ? dates.start : null,
            dateTo: operacion[0] == 4 && !currentBySeason ? dates.end : null,
          },
        },
      });
    }
  };

  return (
    <React.Fragment>
      <div className="filters-form">
        <form className={"layout-container"}>
          <h1>{data.configuration.H1}</h1>
          <div className="filters-group-top css-display-f">
            {/* select tipo de operacion */}
            <div
              className={
                operacion == 4
                  ? "operation-type-container temporal"
                  : "operation-type-container"
              }
            >
              <div className="operation-type-select">
                <SelectBusqueda
                  select="operacion"
                  options={data.configuration.operation_types}
                  value={operacion}
                  placeholder="Tipo de Operación"
                  onChange={handleChangeSelectOperacion}
                  error={
                    typeof formErrors.operacion != "undefined"
                      ? formErrors.operacion
                      : null
                  }
                />
              </div>
              <BuscarPorReferencia />
            </div>

            {/* select tipo de propiedad */}

            {operacion != 4 && (
              <div className="property-type-container">
                <SelectBusqueda
                  select="tipos"
                  options={data.configuration.property_types}
                  value={tipos}
                  placeholder="Tipo de Propiedad"
                  onChange={handleChangeSelectTipos}
                  type="multiple"
                  costum_value_key={"plural"}
                  error={
                    typeof formErrors.tipos != "undefined"
                      ? formErrors.tipos
                      : null
                  }
                />
              </div>
            )}

            <div className="search-box-container">
              <InputBusqueda
                value={search}
                selectedestate={estate}
                selectedzones={searchZones}
                onChange={handleChangeInput}
                doStartSearch={doStartSearch}
                error={
                  typeof formErrors.searchZones != "undefined"
                    ? formErrors.searchZones
                    : null
                }
              />
            </div>

            {/* inputs alquiler temporal */}
            {operacion == 4 && (
              <div className="search-date-container">
                {currentBySeason ? (
                  <div className="temporadas-box-container">
                    <SelectBusqueda
                      value={season}
                      select="temporadas"
                      custom_key="slug"
                      options={data.seasons}
                      placeholder="Seleccione una opción"
                      onChange={handleChangeSelectSeasons}
                    />
                  </div>
                ) : (
                    <DateRangeBusqueda
                      value={dates}
                      handleChangeDates={handleChangeDates}
                    />
                  )}
                <div
                  className="button_byTemporada"
                  onClick={() => setBySeason(!currentBySeason)}
                >
                  <i
                    className={
                      currentBySeason ? "icono-calendario" : "icono-sol"
                    }
                  ></i>
                  {currentBySeason
                    ? "Buscar por calendario"
                    : "Buscar por temporada"}
                </div>
              </div>
            )}

            <BuscarButton doStartSearch={doStartSearch} loading={showLoader}>
              Buscar
            </BuscarButton>
          </div>
        </form>
      </div>

      <style jsx>{BuscadorHomeStyle}</style>
    </React.Fragment>
  );
};

export default BuscadorHome;

function inRecentSearches(search, oldSearches) {
  const search_ids = !Array.isArray(search.search)
    ? search.search.id
    : search.search.map((z) => z.id).sort();

  return oldSearches.findIndex((s) => {
    if (!Array.isArray(search_ids)) {
      return !Array.isArray(s.search) && s.search.id == search_ids;
    } else {
      if (!Array.isArray(s.search)) return false;
      const oldSearch_ids = s.search.map((z) => z.id).sort();
      if (search_ids.length != oldSearch_ids.length) return false;
      let i = 0;
      while (i < search_ids.length) {
        if (search_ids[i] != oldSearch_ids[i]) return false;
        i++;
      }
      return true;
    }
  });
}
