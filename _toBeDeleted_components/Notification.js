import {gql} from "@apollo/client";
import { handleApolloError } from "../lib/apollo.js";
import { useMutation } from "@apollo/client";

const CHANGE_STATUS_MUTATION = gql`
  mutation changeNotificationStatus($id: ID!, $seen: Boolean!) {
    notificationSetSeen(id: $id, seen: $seen) {
      id
    }
  }
`;

const Notification = ({ notification, refetchCurrentUser }) => {
  const [changeNotificationStatus] = useMutation(CHANGE_STATUS_MUTATION, {
    onCompleted: (response) => {
      refetchCurrentUser();
    },
    onError: (error) => handleApolloError(error),
  });

  return (
    <React.Fragment>
      <a
        href={notification.url}
        target={notification.new_tab ? "_blank" : "_self"}
        className={"emergentBubble " + (notification.seen ? "" : "new")}
      >
        <span
          className="imagen_noty imgAsBg"
          style={{
            backgroundImage: "url(" + notification.image + ")",
          }}
        ></span>
        <i
          className={notification.seen ? "mark_unseen" : "mark_seen"}
          onClick={(event) => {
            event.preventDefault();
            changeNotificationStatus({
              variables: { seen: !notification.seen, id: notification.id },
            });
          }}
        >
          <div
            className={
              notification.seen ? "mark_unseen_tooltip" : "mark_seen_tooltip"
            }
          >
            {notification.seen ? "Marcar como no leída" : "Marcar como leída"}
          </div>
        </i>

        <p
          className="text"
          dangerouslySetInnerHTML={{ __html: notification.text }}
        ></p>
        <p className="noty-fecha">{notification.created_at}</p>
        <br className="clear" />
      </a>
      <style jsx>{`
        .emergentBubble {
          position: relative;
          text-align: left;
          z-index: 8;
          background: #f1f1f1;
          color: #77787b;
          border-bottom: solid 1px #e3e3e3;
          font-size: 14px;
          cursor: pointer;
          padding: 7px 30px 7px 8px;
          float: left;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          text-decoration: none;
        }
        .emergentBubble .imagen_noty {
          width: 60px;
          height: 60px;
          display: inline-block;
          float: left;
        }
        .emergentBubble p.text {
          overflow: hidden;
          line-height: 1.3;
          font-size: 13px;
          line-height: 1.3;
          margin: 0;
          width: auto;
          overflow: hidden;
          padding-left: 10px;
          font-weight: normal;
        }
        .emergentBubble p.noty-fecha {
          overflow: hidden;
          line-height: 1.3;
          font-size: 13px;
          line-height: 1.3;
          margin: 0;
          overflow: hidden;
          padding-left: 10px;
          color: #ccc;
          width: auto;
          position: absolute;
          bottom: 10px;
          left: 68px;
        }
        .emergentBubble i.mark_seen,
        .emergentBubble i.mark_unseen {
          display: none;
          color: #c6c6c6;
          position: absolute;
          right: 10px;
          top: 10px;
          cursor: pointer;
          padding: 0;
          z-index: 9;
          width: 5px;
          height: 5px;
          border-radius: 100%;
          background: #fc830b;
          border: 1px solid #fc830b;
        }
        .emergentBubble i.mark_unseen {
          display: block;
          border: 1px solid #b3b3b3;
        }
        .emergentBubble i.mark_unseen {
          background: none;
        }
        .emergentBubble.new i.mark_seen {
          display: block;
        }
        .emergentBubble i.mark_seen:before,
        .emergentBubble i.mark_unseen:before {
          content: "";
          position: absolute;
          width: 25px;
          height: 25px;
          top: 0;
          bottom: 0;
          left: -8px;
          margin: auto auto;
        }
        .emergentBubble:hover {
          background-color: #fff;
        }
        .emergentBubble.new {
          background-color: #fff;
        }
        .emergentBubble.new i.mark_seen:hover:after,
        .emergentBubble i.mark_unseen:hover:after {
          position: absolute;
          content: "";
          border-radius: 100%;
          border: 1px dotted #df6c19;
          width: 13px;
          height: 13px;
          margin: auto;
          left: -5px;
          right: 0;
          top: -5px;
          opacity: 0.65;
        }
        .emergentBubble i.mark_unseen:hover {
          background: #fc830b;
          border: 1px solid #fc830b;
        }
        .emergentBubble.new i.mark_seen:hover {
          background: none;
          border: 1px solid #b3b3b3;
        }
        .emergentBubble .imagen_noty {
          width: 60px;
          height: 60px;
          display: inline-block;
          float: left;
        }
        .emergentBubble .imagen_noty {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        .mark_unseen_tooltip,
        .mark_seen_tooltip {
          display: none;
          position: absolute;
          top: 0px;
          right: 25px;
          padding: 5px 10px;
          border-radius: 3px;
          z-index: 1;
          background-color: #222;
          color: #fff;
          white-space: nowrap;
        }
        .emergentBubble i.mark_seen:hover .mark_seen_tooltip,
        .emergentBubble i.mark_unseen:hover .mark_unseen_tooltip {
          display: block;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Notification;
