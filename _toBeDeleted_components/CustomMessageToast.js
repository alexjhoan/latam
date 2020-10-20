import { toast } from "react-toastify";
import theme from "../styles/theme.js";
import css from "styled-jsx/css";

export const showCustomMessageToast = (idToast, content) => {
  if (!toast.isActive(idToast)) {
    toast(({ closeToast }) => <CustomMessageToast content={content} />, {
      className: "custom-toast",
      bodyClassName: "custom-toast-body",
      progressClassName: "custom-toast-progress",
      position: "top-center",
      toastId: idToast,
    });
  }
};

const CustomMessageToast = ({ content }) => {
  return (
    <React.Fragment>
      <div className="content">{content}</div>
      <style jsx global>
        {CustomToastStyle}
      </style>
    </React.Fragment>
  );
};

export const CustomToastStyle = css.global`
  // TOAST STYLES
  button.Toastify__close-button {
    position: absolute;
    right: 8px;
  }
  .Toastify__toast-container {
    text-align: center;
  }
  .custom-toast {
    background: ${theme.colors.textLight};
    border-radius: 4px;
    min-height: 55px;
    padding: 8px 30px 8px 15px;
    display: inline-flex;
  }
  .custom-toast-progress {
    background: ${theme.colors.primaryOpacity};
  }
  .custom-toast .content {
    color: white;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 13px;
    cursor: default;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-font-smoothing: antialiased;
  }
`;
