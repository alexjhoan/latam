import {
  fontTruliaStyles,
  iconsStyles,
  sliderStyles,
  resetStyles,
  IC2globalStyles,
} from "./stylesheets";

function GlobalStyles() {
  const stylesList = [
    resetStyles,
    fontTruliaStyles,
    IC2globalStyles,
    iconsStyles,
    sliderStyles,
  ];

  return (
    <React.Fragment>
      {stylesList.map((e, i) => {
        return (
          <React.Fragment key={"global_style_" + i}>
            <style jsx global>
              {e}
            </style>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
export default GlobalStyles;
