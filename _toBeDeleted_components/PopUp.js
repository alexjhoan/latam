import React from "react";
import { useState, useEffect, useRef } from "react";
import WindowEventListener from "./WindowEventListener";

const defaultPopupSettings = {
  blanketCSS: { backgroundColor: "rgba(0,0,0,0.85)" },
  closer: "close-pop",
  closeEsc: true,
  fade: true,
  fadeTime: 400,
  blanketClose: true,
  onClose: null,
  scrollable: true,
  stopBodyScroll: false
};

const PopUp = props => {
  const [open, changeOpen] = useState(true);
  const [settings, changeSettings] = useState({
    ...defaultPopupSettings,
    ...props.settings
  });
  const [closer, changeCloser] = useState([]);
  const [bodyScrollPos, changeBodyScrollPos] = useState(0);
  const lockBodyScrolling = () => {
    // Get scroll position to be able to restore it in onCloseModal
    changeBodyScrollPos(
      document.body.scrollTop || document.documentElement.scrollTop || 0
    );
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${bodyScrollPos}px`;
  };
  const restoreBodyScrolling = () => {
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    document.documentElement.scrollTop = document.body.scrollTop = bodyScrollPos;
  };

  useEffect(() => {
    /***** componentDidMount *****/
    // closer
    changeCloser([...document.getElementsByClassName(settings.closer)]);

    /***** componentWillUnmounts *****/
    return () => {};
  }, []);

  useEffect(() => {
    if (!open) {
      // desbloqueo body scroll
      if (settings.stopBodyScroll) restoreBodyScrolling();
      // on close
      if (settings.onClose === "function") settings.onClose();
    } else {
      // stop body scroll
      if (settings.stopBodyScroll) lockBodyScrolling();
    }
  }, [open]);

  // close on scape
  const handleKeyPress = event => {
    if (settings.closeEsc && event.key === "Escape") changeOpen(false);
  };
  WindowEventListener("keydown", handleKeyPress, false);

  // blanket close
  const blanketRef = useRef(null);
  const handleClickOutside = event => {
    event.stopPropagation();
    if (settings.blanketClose && open && blanketRef.current === event.target) {
      changeOpen(false);
    }
  };
  WindowEventListener("click", handleClickOutside, false);

  // click on closer
  const handleClickCloser = event => {
    if (closer.length > 0 && open) {
      closer.forEach(element => {
        if (element.contains(event.target)) changeOpen(false);
      });
    }
  };
  WindowEventListener("click", handleClickCloser, false);

  if (!open) {
    return null;
  }
  return (
    <div id="blanket" ref={blanketRef} style={settings.blanketCSS}>
      {props.children}
      <style jsx>{`
        @keyframes FadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        #blanket {
          position: fixed;
          width: 100%;
          height: 100%;
          z-index: 1008;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.9);
          top: 0;
          left: 0;
          display: block;
          overflow-x: hidden;
          overflow-y: ${settings.scrollable ? "auto" : "hidden"};
          opacity: 0;
          animation: FadeIn ${settings.fade ? settings.fadeTime : "0"}ms ease
            100ms 1 forwards;
        }
        #blanket :global(.popContenedor.cvtp) {
          top: 50%;
        }
        #blanket :global(.popContenedor) {
          width: 90%;
          height: auto;
          max-width: 720px;
          margin: 0 auto;
          left: 0;
          right: 0;
          background-color: #fff;
          z-index: 10030;
          border-radius: 10px;
          background-size: cover;
          background-position: right;
          -webkit-box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.15);
          box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.15);
          position: relative;
        }
        #blanket :global(#popupDestacado) {
          text-align: center;
          background-color: transparent;
          box-shadow: none;
        }
        #blanket :global(#popupDestacado .content) {
          position: relative;
          display: inline-block;
          width: 100%;
        }
        #blanket :global(#popupDestacado .link) {
          display: inline-block;
          max-height: 90vh;
          max-width: 100%;
          width: 100%;
        }
        #blanket :global(#popupDestacado video),
        #blanket :global(#popupDestacado img) {
          max-height: 90vh;
          max-width: 90vw;
          display: block !important;
          position: relative !important;
        }
        #blanket :global(#popupDestacado img) {
          width: 100%;
        }
        #blanket :global(.popContenedor .cerrar_consultar) {
          text-align: center;
        }
      `}</style>
    </div>
  );
};
export default PopUp;
