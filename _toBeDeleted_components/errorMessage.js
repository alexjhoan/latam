const ErrorMessage = ({ error, position }) => {
  if (typeof error != "undefined" && error) {
    return (
      <React.Fragment>
        <p className="error" style={position}>
          {error}
        </p>
        <style jsx>{`
          @keyframes shake {
            0% {
              transform: translateX(-50%);
              opacity: 0;
            }
            25% {
              transform: translateX(calc(-50% - 30px));
              opacity: 0.6;
            }
            50% {
              transform: translateX(calc(-50% - -30px));
              opacity: 1;
            }
            60% {
              transform: translateX(calc(-50% - 20px));
              opacity: 1;
            }
            75% {
              transform: translateX(calc(-50% - -20px));
              opacity: 1;
            }
            90% {
              transform: translateX(calc(-50% - 20px));
              opacity: 1;
            }
            100% {
              transform: translateX(-50%);
              opacity: 1;
            }
          }
          p.error {
            padding: 8px 10px;
            background: #696969;
            color: white;
            font-weight: normal;
            font-size: 13px;
            position: absolute;
            top: -100%;
            left: 50%;
            display: inline-block;
            // width: 100%;
            max-width: 220px;
            box-sizing: border-box;
            box-shadow: 0px 2px 10px -4px rgba(0, 0, 0, 0.8);
            border-radius: 3px;
            animation: shake 1s ease 0s 1 forwards;
            line-height: 20px;
          }
          @media screen and (max-width: 980px) {
            p.error {
              width: auto;
              max-width: 90%;
              white-space: nowrap;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
  return null;
};

export default ErrorMessage;
