const FormErrors = ({ formErrors }) => {
  return (
    <React.Fragment>
      <div
        className="formErrors"
        style={{
          color: "red",
          fontSize: "11px",
          marginTop: "1px",
          textAlign: "left",
          width: "100%"
        }}
      >
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].message.length > 0) {
            return <p key={i}>{formErrors[fieldName].message}</p>;
          } else {
            return "";
          }
        })}
      </div>
    </React.Fragment>
  );
};

export default FormErrors;
