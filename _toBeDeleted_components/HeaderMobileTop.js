import HeaderMobileStyles from "../styles/components/HeaderMobile";
import HeaderLogo from "./HeaderLogo";

const HeaderMobileTop = ({ toggleMobileMenu, isLoggedIn, currentUser }) => {
  return (
    <React.Fragment>
      {/* barra superior */}
      <div id="mobileTop">
        <div className="contentInnerTop">
          <div className="mobileLogo">
            <HeaderLogo />
          </div>

          <i
            className="icon-menu"
            onClick={() => toggleMobileMenu()}
            id="iconMenu"
          >
            {isLoggedIn && currentUser.unread_notifications ? (
              <span className="notificaciones_ball dn">
                <span>
                  {currentUser.unread_notifications >= 99
                    ? "+99"
                    : currentUser.unread_notifications}
                </span>
              </span>
            ) : null}
          </i>

          <div id="contentMobile"></div>
        </div>
      </div>
      <style jsx>{HeaderMobileStyles}</style>
    </React.Fragment>
  );
};

export default HeaderMobileTop;
