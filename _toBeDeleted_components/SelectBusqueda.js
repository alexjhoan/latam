import SelectBusquedaStyle from "../styles/components/SelectBusqueda.js";

class SelectBusqueda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      open: false,
      key: typeof props.custom_key !== "undefined" ? props.custom_key : "id",
      value_key:
        typeof props.costum_value_key !== "undefined"
          ? props.costum_value_key
          : "name"
    };
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }
  handleClickOutside = event => {
    if (!this.node.contains(event.target)) {
      this.setState({
        open: false
      });
    }
  };

  optionName(id) {
    const key = this.state.key;
    var opt = this.props.options.find(function(o) {
      return o[key] == id;
    });
    return opt;
  }
  selectOption(e, mobile) {
    if (mobile) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      this.props.onChange(value);
    } else {
      if (this.props.type == "multiple") {
        let res = Object.values(this.props.value);
        if (res.indexOf(e) < 0) {
          res.push(e);
        } else {
          res.splice(res.indexOf(e), 1);
        }
        res.sort((a, b) => Number(a) - Number(b));
        this.props.onChange(res);
      } else {
        this.props.onChange([e]);
      }
    }

    if (this.props.type != "multiple") {
      this.setState({ open: false });
    }
  }
  setHeaderText() {
    let text = "";
    this.props.value.forEach((item, i) => {
      let opt = this.optionName(item);
      if (typeof opt != "undefined") {
        if (i < this.props.value.length - 1) {
          text += opt[this.state.value_key] + ", ";
        } else {
          text += opt[this.state.value_key];
        }
      }
    });
    return text;
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={
            this.props.type == "multiple"
              ? "dropdown-container multiple"
              : "dropdown-container"
          }
          ref={node => (this.node = node)}
        >
          {/* select nativo (mobile) */}
          <select
            multiple={this.props.type == "multiple"}
            value={
              this.props.type == "multiple"
                ? this.props.value
                : this.props.value[0]
            }
            onChange={event => this.selectOption(event, true)}
          >
            {this.props.options.map(function(opt) {
              return (
                <option
                  value={opt[this.state.key]}
                  key={"option_" + opt[this.state.key]}
                >
                  {opt[this.state.value_key]}
                </option>
              );
            }, this)}
          </select>

          {/* placeholder / valor seleccionado cuando el select esta cerrado */}
          <div
            className="header"
            onClick={() => this.setState({ open: !this.state.open })}
            title={this.setHeaderText()}
          >
            {this.props.value.length == 0 ? (
              <span className="placeHolder">{this.props.placeholder}</span>
            ) : (
              <span>{this.setHeaderText()}</span>
            )}
            <i className="icon-angle-down" />

            {this.props.error ? (
              <p className="error">{this.props.error}</p>
            ) : null}
          </div>

          {/* select custom html (desktop) */}
          <div className={this.state.open ? "dropdown open" : "dropdown"}>
            {this.props.options.map(function(opt) {
              return (
                <div
                  key={"option_div_" + opt[this.state.key]}
                  operation={opt[this.state.key]}
                  title={opt[this.state.value_key]}
                  className={
                    this.props.value.indexOf(opt[this.state.key]) < 0
                      ? "option"
                      : "option checked"
                  }
                  onClick={e => this.selectOption(opt[this.state.key])}
                >
                  <div className="check">
                    <i className="icon-ok"></i>
                  </div>
                  <span className="text">{opt[this.state.value_key]}</span>
                </div>
              );
            }, this)}
          </div>
        </div>
        <style jsx>{SelectBusquedaStyle}</style>
      </React.Fragment>
    );
  }
}

export default SelectBusqueda;
