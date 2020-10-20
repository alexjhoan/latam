function Loader(props) {
  return (
    <React.Fragment>
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 3px solid
            ${typeof props.bk_color != "undefined" ? props.bk_color : "#f3f3f3"}; /* Light grey */
          border-top: 3px solid
            ${typeof props.color != "undefined" ? props.color : "#3498db"}; /* Blue */
          border-radius: 50%;
          width: ${typeof props.width != "undefined" ? props.width : "12px"};
          height: ${typeof props.height != "undefined" ? props.height : "12px"};
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </React.Fragment>
  );
}

export default Loader;
