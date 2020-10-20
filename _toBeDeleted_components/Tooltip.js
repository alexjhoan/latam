const Tooltip = props => (
  <React.Fragment>
    <div className="tooltip">
      {props.children}
      <div className="content">{props.content}</div>
    </div>
    <style jsx>{`
      .tooltip {
        position: relative;
      }
      .tooltip .content {
        padding: 8px 10px;
        background: #696969;
        color: white;
        font-weight: normal;
        font-size: 14px;
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translateX(-50%) translateY(calc(-100% - 20px));
        display: none;
        width: max-content;
        max-width: 220px;
        box-sizing: border-box;
        box-shadow: 0px 2px 10px -4px rgba(0, 0, 0, 0.8);
        border-radius: 3px;
      }
      .tooltip .content:before {
        content: "";
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 0px;
        height: 0px;
        border: 10px solid transparent;
        border-top: 10px solid #696969;
      }
      .tooltip:hover .content {
        display: block;
      }
    `}</style>
  </React.Fragment>
);
export default Tooltip;
