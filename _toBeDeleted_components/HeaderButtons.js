import HeaderButton from "./HeaderButton";
import HeaderDropdown from "./HeaderDropdown";
import Notificaciones from "./Notificaciones";
import UserProfile from "./UserProfile";
import LogOutButton from "./LogOutButton";

// los posibles user son : individuale, agent, anyUser, all, unauthenticated, notAgent

const HeaderButtons = (props) => {
  const filterButtons = (b) => {
    let res = true;
    // si esta mobile   props.display
    if (props.mobile) {
      res = res && (b.display == "mobile" || b.display == "all");
    } else {
      res = res && (b.display == "desktop" || b.display == "all");
    }

    // si esta loggeado - props.isLoggedIn
    if (props.isLoggedIn) {
      if (props.currentUser.individual) {
        // si es individual props.currentUser.individual
        res =
          res &&
          (b.userShow == "individual" ||
            b.userShow == "anyUser" ||
            b.userShow == "all" ||
            b.userShow == "notAgent");
      } else {
        // si es inmo !props.currentUser.individual
        res =
          res &&
          (b.userShow == "agent" ||
            b.userShow == "anyUser" ||
            b.userShow == "all");
      }
    } else {
      // si no esta loggeado
      res =
        res &&
        (b.userShow == "unauthenticated" ||
          b.userShow == "all" ||
          b.userShow == "notAgent");
    }
    return res;
  };
  const sortButtons = (a, b) => {
    if (props.mobile) {
      return a.orderMobile - b.orderMobile;
    } else {
      return a.order - b.order;
    }
  };

  const printDropdown = (b) => {
    let buttonHeader;
    let hover;

    if (b.classname.includes("user_profile")) {
      buttonHeader = <UserProfile currentUser={props.currentUser} />;
      hover = true;
    } else {
      buttonHeader = printButton(b, () => {});
      hover = false;
    }

    return (
      <HeaderDropdown
        classname={b.classname}
        buttonHeader={buttonHeader}
        hover={hover}
        key={"button_dropdown_" + b.id}
      >
        {b.children
          .filter((button) => filterButtons(button))
          .sort((a, c) => sortButtons(a, c))
          .map((boton) => printButton(boton))}
      </HeaderDropdown>
    );
  };

  const printButton = (b, action) => {
    if (b.classname.includes("notifications")) {
      return (
        <Notificaciones
          refetchCurrentUser={props.refetchCurrentUser}
          countUnread={props.currentUser.unread_notifications}
          notifications={props.currentUser.notifications}
          key={"button_header_" + b.id}
        />
      );
    } else if (b.classname.includes("cerrar_sesion")) {
      return <LogOutButton key={"button_header_" + b.id} />;
    } else if (
      b.classname.includes("withProperties") &&
      props.currentUser.property_count == 0
    ) {
      return null;
    }

    if (b.classname.includes("register")) action = props.clicksOnSignUp;
    if (b.classname.includes("iniciar_sesion")) action = props.clicksOnSignIn;

    return (
      <HeaderButton button={b} action={action} key={"button_header_" + b.id} />
    );
  };

  return (
    <React.Fragment>
      <ul className="headerButtons">
        {props.buttons
          .filter((button) => filterButtons(button))
          .sort((a, b) => sortButtons(a, b))
          .map((b) => {
            if (b.children.length > 0) {
              return printDropdown(b);
            } else {
              return printButton(b);
            }
          })}
      </ul>
      <style jsx>{`
        ul.headerButtons {
          width: 100%;
          margin-left: 5px;
          margin-bottom: 12px;
          display: inline-block;
          height: 25px;
        }
        @media screen and (max-width: 980px) {
          ul.headerButtons {
            width: 100%;
            margin: 20px 0px 0px;
            display: inline-block;
            height: auto;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default HeaderButtons;
