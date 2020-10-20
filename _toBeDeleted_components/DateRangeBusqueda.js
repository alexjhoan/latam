import React, { useRef } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
require("react-day-picker/lib/style.css");
import theme from "../styles/theme.js";

const meses = [
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
  "Diciembre",
];
const shortDays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

function DateRangeBusqueda(props) {
  const refTo = useRef(null);
  const formatDate = (date) => {
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return day + "/" + month + "/" + date.getFullYear();
  };
  const saveDate = (date) => {
    const month =
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    return date.getFullYear() + "-" + month + "-" + day;
  };
  const parseDate = (date) => {
    return date != null ? new Date(date.split("-").join("/")) : null;
  };

  return (
    <React.Fragment>
      <div className="DatePickerContainer start">
        <DayPickerInput
          value={parseDate(props.value.start)}
          placeholder="Llegada"
          formatDate={formatDate}
          onDayChange={(day) =>
            props.handleChangeDates(saveDate(day), props.value.end)
          }
          inputProps={{ readOnly: true }}
          dayPickerProps={{
            selectedDays: [
              parseDate(props.value.start),
              {
                from: parseDate(props.value.start),
                to: parseDate(props.value.end),
              },
            ],
            disabledDays: {
              after: parseDate(props.value.end),
              before: new Date(),
            },
            toMonth: parseDate(props.value.end),
            numberOfMonths: 1,
            onDayClick: () => refTo.current.getInput().focus(),
            months: meses,
            weekdaysShort: shortDays,
            firstDayOfWeek: 1,
            modifiers: {
              firstSelected: parseDate(props.value.start),
              lastSelected: parseDate(props.value.end),
            },
          }}
        />
      </div>

      <div className="DatePickerContainer end">
        <DayPickerInput
          ref={refTo}
          value={parseDate(props.value.end)}
          placeholder="Salida"
          formatDate={formatDate}
          onDayChange={(day) =>
            props.handleChangeDates(props.value.start, saveDate(day))
          }
          inputProps={{ readOnly: true }}
          dayPickerProps={{
            selectedDays: [
              parseDate(props.value.start),
              {
                from: parseDate(props.value.start),
                to: parseDate(props.value.end),
              },
            ],
            disabledDays: {
              before:
                props.value.start !== null
                  ? parseDate(props.value.start)
                  : new Date(),
            },
            month: parseDate(props.value.start),
            fromMonth: parseDate(props.value.start),
            numberOfMonths: 1,
            months: meses,
            weekdaysShort: shortDays,
            firstDayOfWeek: 1,
            modifiers: {
              firstSelected: parseDate(props.value.start),
              lastSelected: parseDate(props.value.end),
            },
          }}
        />
      </div>
      <style jsx global>{`
        .DatePickerContainer {
          flex-basis: calc(50% - 4px);
          position: relative;
          height: 100%;
        }
        .DatePickerContainer .DayPickerInput {
          height: 100%;
          width: 100%;
        }
        .DatePickerContainer .DayPickerInput input {
          width: 100%;
          box-sizing: border-box;
          height: 100%;
          appearance: none;
          padding: 0 10px;
          border: none;
          width: 100%;
          display: block;
          font-size: 15px;
          font-weight: 300;
          color: #666;
          border-radius: 0px;
        }
        .DatePickerContainer .DayPickerInput-Overlay {
          top: 6px;
          border-top: 2px solid #d9d9d9;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }
        .DatePickerContainer .DayPickerInput-Overlay:before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          top: -15px;
          left: 11px;
          border: 7px solid transparent;
          border-bottom-color: #d9d9d9;
        }
        .DatePickerContainer .DayPicker {
          font-size: 0.85rem;
          font-weight: 400;
          color: ${theme.colors.text};
        }
        .DatePickerContainer .DayPicker-Day--today {
          color: ${theme.colors.text};
        }
        .DatePickerContainer .DayPicker-NavButton {
          top: 0.6em;
          right: 1.2em;
        }
        .DatePickerContainer .DayPicker-Day {
          border-radius: 0;
          border: 1px solid #ededed;
          padding: 0.5em calc(0.5em - 1px);
        }
        .DatePickerContainer
          .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
          background-color: ${theme.colors.primaryOpacity};
          color: ${theme.colors.text};
        }
        .DatePickerContainer
          .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
          background-color: ${theme.colors.primary};
        }
        .DatePickerContainer .DayPicker-Day--firstSelected,
        .DatePickerContainer .DayPicker-Day--lastSelected {
          background-color: ${theme.colors.primary} !important;
          color: white !important;
          font-weight: 700;
        }
        .DatePickerContainer .DayPicker-Day--firstSelected {
          border-radius: 7px 0 0 6px;
        }
        .DatePickerContainer .DayPicker-Day--lastSelected {
          border-radius: 0 7px 6px 0;
        }

        @media screen and (max-width: 768px) {
          .DatePickerContainer {
            flex-basis: calc(50% - 2px);
          }
          .DatePickerContainer .DayPicker {
            font-size: 0.95rem;
          }
          .DatePickerContainer.end .DayPickerInput-Overlay {
            left: auto;
            right: 0;
          }
          .DatePickerContainer.end .DayPickerInput-Overlay:before {
            left: auto;
            right: 11px;
          }
        }
      `}</style>
    </React.Fragment>
  );
}

export default DateRangeBusqueda;
