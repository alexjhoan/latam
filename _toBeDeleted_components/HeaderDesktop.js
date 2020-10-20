import { useState } from "react";
import HeaderDesktopStyles from "../styles/components/HeaderDesktop";
import WindowEventListener from "./WindowEventListener";
import HeaderLogo from "./HeaderLogo";
import HeaderButtons from "./HeaderButtons";
import ImagenOptimizada from "./ImagenOptimizada";

const HeaderDesktop = (props) => {
  return (
    <React.Fragment>
      <div className="fakeHeader"></div>
      <div id="header" style={{ height: "50px" }}>
        <div className="container headerDesktop">
          <HeaderLogo />
          <HeaderButtons {...props} mobile={false} />
        </div>
      </div>
      <style jsx>{HeaderDesktopStyles}</style>
    </React.Fragment>
  );
};

export default HeaderDesktop;
