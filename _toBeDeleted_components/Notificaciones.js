import theme from "../styles/theme.js";
import Notification from "./Notification";
import { useState, useEffect, useRef } from "react";
import {gql} from "@apollo/client";
import { useMutation } from "@apollo/client";
import WindowEventListener from "./WindowEventListener.js";
import { handleApolloError } from "../lib/apollo.js";

const ALL_NOTIFICATION_SEEN_MUTATION = gql`
  mutation changeNotificationsStatus {
    notificationSeeAll
  }
`;

function Notificaciones({ countUnread, notifications, refetchCurrentUser }) {
  const [showNotificaciones, toggleNotificaciones] = useState(false);
  const [setAllNotificationSeen] = useMutation(ALL_NOTIFICATION_SEEN_MUTATION, {
    onCompleted: (response) => {
      refetchCurrentUser();
    },
    onError: (error) => handleApolloError(error),
  });
  const dropdown = useRef(null);

  const handleClickOutside = (event) => {
    if (
      showNotificaciones &&
      dropdown.current != null &&
      !dropdown.current.contains(event.target)
    )
      toggleNotificaciones(false);
  };
  WindowEventListener("click", handleClickOutside, false);

  return (
    <React.Fragment>
      <li className="notificaciones noSelect ">
        <a
          onClick={() => toggleNotificaciones(!showNotificaciones)}
          className="boton desktop"
        >
          <span
            className="text"
            style={{
              display: "block",
              opacity: "0",
              position: "relative",
              zIndex: "-1",
              height: "1px",
              width: "1px",
              overflow: "hidden",
            }}
          >
            Notificaciones
          </span>
          <i className={"icon-bell-alt" + (countUnread > 0 ? " dark" : "")}></i>
          {countUnread > 0 ? (
            <span className="notificaciones_ball">
              {countUnread >= 100 ? "+99" : countUnread}
            </span>
          ) : null}
        </a>
        <a href="/notificaciones" className="boton mobile">
          <i className={"icon-bell-alt" + (countUnread > 0 ? " dark" : "")}></i>
          {countUnread > 0 ? (
            <span className="notificaciones_ball">
              {countUnread >= 100 ? "+99" : countUnread}
            </span>
          ) : null}
        </a>

        <div
          ref={dropdown}
          className="notifiactions desktop"
          data-nuevas="6"
          style={{ display: showNotificaciones ? "block" : "none" }}
        >
          <div className="flecha_header"></div>
          <div className="top">
            <span>Notificaciones</span>
            <div
              id="todasLeidas"
              className={countUnread === 0 ? "disabled" : ""}
              onClick={(event) => {
                event.preventDefault();
                if (countUnread > 0) setAllNotificationSeen();
              }}
            >
              Marcar todas como leídas
            </div>
          </div>
          <div className="holder">
            {notifications.data.length > 0 ? (
              notifications.data.map((n) => (
                <Notification
                  refetchCurrentUser={refetchCurrentUser}
                  key={"notificacion_" + n.id}
                  notification={n}
                />
              ))
            ) : (
              <div className="noNoty">No tienes notificaciones nuevas</div>
            )}
          </div>
          <a href="/notificaciones" className="bottom">
            Ver todas
          </a>
        </div>
      </li>
      <style jsx>{`
        .flecha_header {
          height: 20px;
          overflow: hidden;
          position: absolute;
          right: 30px;
          top: -20px;
          width: 50px;
        }
        .flecha_header:before {
          background: #fff;
          box-shadow: 1px 1px 4px rgba(23, 20, 20, 0.7);
          content: "";
          height: 20px;
          position: absolute;
          top: 12px;
          width: 20px;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        .notifiactions {
          cursor: default;
          display: none;
          box-shadow: 1px 1px 4px rgba(23, 20, 20, 0.52);
          position: absolute;
          background-color: #fff;
          margin-top: 30px;
          right: -20px;
          padding-bottom: 30px;
          width: 360px;
        }
        .desktop {
          display: block;
        }
        .mobile {
          display: none;
        }
        .bottom {
          position: absolute;
          z-index: 9;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: solid 2px #d1d1d1;
          color: #fc830b;
          padding: 3px 0;
          background-color: #fff;
          font-weight: 600;
          font-size: 14px;
        }
        .notifiactions .holder {
          max-height: 430px;
          overflow: auto;
          width: 100%;
        }

        li {
          height: 25px;
          line-height: 25px;
          float: left;
          border-right: 1px solid #ddd;
          text-align: center;
        }
        li.notificaciones {
          position: relative;
          cursor: pointer;
          font-size: 15px;
          float: right;
          padding-right: 5px;
        }
        .notifiactions .top {
          border-bottom: solid 1px #e3e3e3;
          text-align: left;
          padding: 2px 16px;
          font-weight: bold;
          font-size: 13px;
          cursor: default;
        }
        .notifiactions .top #todasLeidas {
          font-weight: normal;
          color: #fc830b !important;
          float: right;
          font-size: 12px;
          width: auto !important;
          padding-right: 0 !important;
          cursor: pointer;
        }
        .notifiactions .top #todasLeidas:hover {
          text-decoration: underline;
        }
        .notifiactions .bottom {
          position: absolute;
          z-index: 9;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: solid 2px #d1d1d1;
          color: #fc830b;
          padding: 3px 0;
          background-color: #fff;
          font-weight: 600;
          font-size: 14px;
        }
        .notifiactions .bottom:hover {
          text-decoration: underline;
        }
        li a {
          padding: 0 6px 0 6px;
        }
        a {
          text-decoration: none;
        }
        .notificaciones_ball {
          background-color: #ff5a5f;
          color: #fff;
          border-radius: 12px;
          width: auto;
          min-width: 9px;
          height: 13px;
          padding: 1px 3px;
          position: absolute;
          text-align: center;
          font-weight: bold;
          top: -1px;
          left: 50%;
          line-height: 14px;
          font-size: 12px;
        }
        .notifiactions .top #todasLeidas.disabled {
          color: #b3b3b3 !important;
          pointer-events: none;
        }
        .notificaciones i {
          color: #fff;
          text-shadow: -1px 0 #77787b, 0 1px #77787b, 1px 0 #77787b,
            0 -1px #77787b;
        }
        .notificaciones i.dark {
          color: ${theme.colors.textHover};
        }

        .notificaciones:hover i {
          opacity: 0.75;
        }
        .boton {
          padding: 0px 10px;
          cursor: pointer;
        }
        .noNoty {
          background-color: #f1f1f1;
          padding: 12px;
          padding-bottom: 14px;
          color: #666;
          line-height: 25px;
        }
        @media screen and (max-width: 980px) {
          li.notificaciones {
            position: absolute;
            right: 5px;
            top: 26px;
            border-right: none;
            z-index: 100;
          }
          .notificaciones i {
            font-size: 20px;
          }
          .desktop {
            display: none;
          }
          .mobile {
            display: block;
          }
          .notificaciones_ball {
            left: unset;
            right: 0px;
          }
        }
      `}</style>
    </React.Fragment>
  );
}

export default Notificaciones;
