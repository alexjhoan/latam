import Measure from "react-measure";

class ImagenOptimizada extends React.Component {
  state = {
    dimensions: {
      width: 1,
      height: 1
    }
  };

  render() {
    return (
      <Measure
        bounds
        onResize={contentRect => {
          //only first time rendering
          if (this.state.dimensions.width <= 1) {
            this.setState({ dimensions: contentRect.bounds });
          }
        }}
      >
        {({ measureRef }) => {
          const white_pixel =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8zwMAAhABDcCVldsAAAAASUVORK5CYII=";

          const width = String(
            Math.round(
              Math.max(
                this.props.minWidth ? this.props.minWidth : 1,
                this.state.dimensions.width
              )
            )
          );
          const height = String(
            Math.round(
              Math.max(
                this.props.minHeight ? this.props.minHeight : 1,
                this.state.dimensions.height
              )
            )
          );

          const d = width + "x" + height;
          const resize = this.props.resize ? this.props.resize : "outside";
          let src = String(this.props.src);
          src = src.replace("cdn1.", "cdn2.");
          src = src.replace(
            "repo/img/",
            "repo/img/" + "th." + resize + d + "."
          );
          src = src.replace("web/", "web/" + "th." + resize + d + ".");

          const imgProps = {
            src: this.state.dimensions.width > 1 ? src : white_pixel,
            alt: this.state.dimensions.width > 1 ? this.props.alt : ""
          };

          for (const i in this.props) {
            if (["className"].includes(i)) {
              imgProps[i] = this.props[i];
            }
          }

          return <img ref={measureRef} {...imgProps} />;
        }}
      </Measure>
    );
  }
}

export default ImagenOptimizada;
