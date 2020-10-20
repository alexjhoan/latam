import React, { Component } from "react";
import BlockCollapseStyles from "../styles/components/BlockCollapse.js";

class BlockCollapse extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <div className={this.state.open ? "BlockCollapse open" : "BlockCollapse"}>
        <div className="BlockCollapseHeader" onClick={this.handleClick}>
          <h5>{this.props.titulo}</h5>
          <i
            className={this.state.open ? "icon-angle-up" : "icon-angle-down"}
          ></i>
        </div>
        <div className="BlockCollapseBody">{this.props.children}</div>
        <style jsx>{BlockCollapseStyles}</style>
      </div>
    );
  }
}

export default BlockCollapse;
