import MobileMenuStyles from "../styles/components/MobileMenu";
import HeaderButtons from "./HeaderButtons";
import ImagenOptimizada from "./ImagenOptimizada";

const MobileMenu = (props) => {
  return (
    <React.Fragment>
      <div id="blankMenu" onClick={() => props.toggleMobileMenu()}></div>
      <div className="closeMainMenu" onClick={() => props.toggleMobileMenu()}>
        <i className="icon-left-open"></i>
      </div>

      <div id="mobileMenu">
        <HeaderButtons {...props} mobile={true} key="headerbuttonsMobile" />
        <div className="appSection">
          <div className="promoAppiOS">
            <div className="logoApp">
              <ImagenOptimizada
                src="https://cdn2.infocasas.com.uy/web/59677ce52e04a_infocdn__logo-app.png"
                alt=""
              />
            </div>
            <div className="mtitle">
              ¡Descargá gratis la
              <br /> app de InfoCasas!
            </div>
            <div className="cont">
              <div className="ctrans"></div>
              <div className="contBtns">
                <a
                  href="https://itunes.apple.com/uy/app/infocasas/id1126880888?mt=8"
                  id="appleApp"
                >
                  <ImagenOptimizada
                    src="https://cdn2.infocasas.com.uy/web/5b438942297db_infocdn__599f22ebf3458_infocdn__appstore-logo.png"
                    alt="Descargar en la App Store"
                    className="gp descargar"
                    style={{ left: 0, opacity: 1 }}
                    title="Descargar la app de InfoCasas para iOS"
                  />
                </a>
                <a
                  id="androidApp"
                  href="https://play.google.com/store/apps/details?id=uy.com.infocasas.infoapp"
                  style={{ display: "none" }}
                >
                  <ImagenOptimizada
                    src="https://cdn2.infocasas.com.uy/web/599f22b79c8e3_infocdn__playstore-logo.png"
                    alt="Descargar en Google Play"
                    className="gp descargar"
                    style={{ left: 0, opacity: 1 }}
                    title="Descargar la app de InfoCasas para Android"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{MobileMenuStyles}</style>
    </React.Fragment>
  );
};

export default MobileMenu;
