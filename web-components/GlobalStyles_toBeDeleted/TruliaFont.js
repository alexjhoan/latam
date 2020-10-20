// css externo
import css from "styled-jsx/css";

export default css.global`
  @font-face {
    font-family: "TruliaSans";
    src: url("https://www.trulia.com/images/fonts/TruliaSans_20190627/TruliaSansWeb-Regular.woff2")
        format("woff2"),
      url("https://www.trulia.com/images/fonts/TruliaSans_20190627/TruliaSansWeb-Regular.woff")
        format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "TruliaSans";
    src: url("https://www.trulia.com/images/fonts/TruliaSans_20190627/TruliaSansWeb-Bold.woff2")
        format("woff2"),
      url("https://www.trulia.com/images/fonts/TruliaSans_20190627/TruliaSansWeb-Bold.woff")
        format("woff");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
`;
