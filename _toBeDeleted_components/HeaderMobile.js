import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import HeaderMobileTop from "./HeaderMobileTop";

const HeaderMobile = props => {
  const [currentShowMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => setShowMobileMenu(!currentShowMobileMenu);

  const [bodyScrollPos, changeBodyScrollPos] = useState(0);
  const lockBodyScrolling = () => {
    // Get scroll position to be able to restore it in onCloseModal
    changeBodyScrollPos(
      document.body.scrollTop || document.documentElement.scrollTop || 0
    );
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${bodyScrollPos}px`;
  };
  const restoreBodyScrolling = () => {
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    document.documentElement.scrollTop = document.body.scrollTop = bodyScrollPos;
  };

  useEffect(() => {
    if (currentShowMobileMenu) {
      lockBodyScrolling();
    } else {
      restoreBodyScrolling();
    }
    return () => {};
  }, [currentShowMobileMenu]);

  return (
    <React.Fragment>
      <HeaderMobileTop
        currentUser={props.currentUser}
        isLoggedIn={props.isLoggedIn}
        toggleMobileMenu={toggleMobileMenu}
      />
      {currentShowMobileMenu ? (
        <MobileMenu
          toggleMobileMenu={toggleMobileMenu}
          showMobileMenu={currentShowMobileMenu}
          {...props}
        />
      ) : null}
    </React.Fragment>
  );
};

export default HeaderMobile;
