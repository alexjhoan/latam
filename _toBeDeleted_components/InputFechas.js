import React, { useState } from "react";
import SelectBusqueda from "./SelectBusqueda.js";
import DateRangeBusqueda from "./DateRangeBusqueda.js";

const InputFechas = ({
  seasons,
  handleChangeSelectSeasons,
  value,
  handleChangeDates,
  dates
}) => {
  const [currentBySeason, setBySeason] = useState(false);

  const handleTipoFecha = () => {
    setBySeason(!currentBySeason);
  };

  return (
    <React.Fragment>
      {currentBySeason ? (
        <div className="temporadas-box-container">
          <SelectBusqueda
            value={value}
            select="temporadas"
            custom_key="slug"
            options={seasons}
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
      <div className="button_byTemporada" onClick={() => handleTipoFecha()}>
        <i className={currentBySeason ? "icono-calendario" : "icono-sol"}></i>
        {currentBySeason ? "Buscar por calendario" : "Buscar por temporada"}
      </div>
      <style jsx>{`
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
      `}</style>
    </React.Fragment>
  );
};

export default InputFechas;
