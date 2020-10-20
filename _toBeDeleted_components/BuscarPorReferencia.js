import { useState, useRef, useEffect } from "react";
import {gql} from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import Loader from "./Loader";
import { handleApolloError } from "../lib/apollo";

const REF_SEARCH_QUERY = gql`
  query searchByRef($code: String!) {
    searchByRef(refCode: $code) {
      ... on Property {
        link
      }
      ... on Project {
        link
      }
    }
  }
`;

export default function BuscarPorReferencia(props) {
  const [showInputReferencia, toggleShowInputReferencia] = useState(false);
  const [loadingSearch, showLoading] = useState(false);
  const [valueInputReferencia, changeInputReferencia] = useState("");
  const [inputError, changeError] = useState(null);
  const inputRef = useRef(null);

  const [searchByReference, { ...rest }] = useLazyQuery(REF_SEARCH_QUERY, {
    onCompleted: (data) => {
      showLoading(false);
      focus();
      if (data.searchByRef != null)
        window.location.href = data.searchByRef.link;
      else startErrorInput("Referencia inválida");
    },
    onError: (error) => {
      showLoading(false);
      focus();
      startErrorInput("Error, vuelve a intentarlo");
      handleApolloError(error);
    },
    fetchPolicy: "no-cache",
  });

  const buscarReferencia = function() {
    if (!loadingSearch) {
      if (valueInputReferencia === "") {
        startErrorInput("Debe ingresar una referencia");
      } else if (valueInputReferencia.length < 5) {
        startErrorInput("Referencia inválida");
      } else {
        changeError(null);
        showLoading(true);
        searchByReference({
          variables: {
            code: valueInputReferencia,
          },
        });
      }
    }
  };

  const startErrorInput = function(message) {
    changeError(message);
    setTimeout(function() {
      changeError(null);
    }, 4000);
  };

  const focus = () => inputRef.current.focus();
  useEffect(() => {
    if (showInputReferencia) focus();
  }, [showInputReferencia]);

  const enterPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      buscarReferencia();
    }
  };

  return (
    <React.Fragment>
      <span
        id="buscarref"
        onClick={() => toggleShowInputReferencia(!showInputReferencia)}
      >
        <i className="icon-plus-circle"></i>Buscar por referencia
      </span>

      {showInputReferencia ? (
        <div id="buscarReferencia">
          <div className="innerreferencia">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ref. 12345"
              value={valueInputReferencia}
              autoFocus={true}
              onKeyDown={(e) => enterPress(e)}
              onChange={(event) => changeInputReferencia(event.target.value)}
            />

            {inputError && <p className="error">{inputError}</p>}

            <div id="botonreferencia" onClick={() => buscarReferencia()}>
              {!loadingSearch ? (
                <i className="icon-angle-right"></i>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      ) : null}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        #cercania_option span,
        #buscarref {
          float: left;
          margin-top: 0;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          transition: all 0.35s ease;
          -webkit-font-smoothing: antialiased;
        }
        #buscarref {
          position: absolute;
          margin-top: 10px;
          cursor: pointer;
        }
        #buscarReferencia {
          position: absolute;
          left: 10px;
          bottom: 0;
          width: 148px;
          height: 31px;
          background-color: rgba(26, 26, 26, 0.5);
          padding: 3px;
          display: block;
          border-radius: 0px;
        }
        #buscarReferencia:after {
          bottom: 100%;
          left: 30px;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-color: rgba(136, 183, 213, 0);
          border-bottom-color: rgba(0, 0, 0, 0.5);
          border-width: 9px;
          margin-left: -9px;
        }
        #buscarReferencia .innerreferencia div#botonreferencia {
          position: absolute;
          width: 30px;
          height: 30px;
          background: #fc830b;
          right: -32px;
          top: 0px;
          cursor: pointer;
          transition: all 0.35s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #buscarReferencia .innerreferencia {
          position: absolute;
        }
        #botonreferencia i {
          color: white;
          font-size: 20px;
        }
        input {
          height: 51px;
          line-height: 1em;
          border: solid 1px #b3b3b3;
          font-size: 14px;
          padding: 0 9.5px;
        }
        #buscarReferencia .innerreferencia input {
          width: 96px;
          height: 30px !important;
          border: 0;
          margin-left: 0px;
          line-height: 30px;
          color: #666;
          margin-right: 1px;
        }
        .error {
          opacity: 0;
          animation: fadeIn 500ms ease 1 forwards;
          position: absolute;
          top: 10px;
          left: 1px;
          margin-top: -46px;
          z-index: 500;
          display: inline-block;
          white-space: nowrap;
          max-width: 160px;
          color: #fff;
          background-color: #666;
          font-size: 12px;
          padding: 10px;
          text-align: left;
          line-height: 1.5;
          border-radius: 3px;
        }
        .error:after {
          content: "";
          border: 6px solid transparent;
          border-top: 6px solid #666;
          box-sizing: border-box;
          position: absolute;
          z-index: 501;
          bottom: -12px;
          left: 18px;
        }
        @media screen and (max-width: 980px) {
          #buscarref {
            bottom: 0px;
            color: #fff;
            padding-top: 15px;
            padding-bottom: 10px;
            margin-top: 0px;
            width: calc(100% - 20px);
          }
          #buscarReferencia .innerreferencia {
            position: absolute;
          }
          #buscarReferencia .innerreferencia {
            width: 100%;
            padding: 0px 2%;
            box-sizing: border-box;
          }
          #buscarReferencia {
            bottom: -60px;
            width: 100%;
            height: 35px;
            padding: 7px 0px;
            left: 0;
          }
          #buscarReferencia .innerreferencia input {
            width: calc(100% - 43px);
            height: 35px !important;
            margin: 0px;
            box-sizing: border-box;
            appearance: none;
            border-radius: 0px;
          }
          #buscarReferencia .innerreferencia div#botonreferencia {
            width: 43px;
            height: 35px;
            right: 2%;
            margin: 0px;
          }
          .error {
            left: 50%;
            transform: translateX(-50%);
          }
          .error:after {
            display: none;
          }
        }
      `}</style>
    </React.Fragment>
  );
}
