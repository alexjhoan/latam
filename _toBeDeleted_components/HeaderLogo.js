const HeaderLogo = ({ currentBig }) => {
  return (
    <React.Fragment>
      <a
        className="logo"
        href="/"
        title="InfoCasas, Portal de Venta y Alquiler de Inmuebles"
        target="_self"
      >
        <div id="squares"></div>
        <div id="realLogo" className=""></div>
      </a>

      <style jsx>{`
        a.logo {
          position: relative;
          float: left;
          display: block;
          height: 37px;
          width: 155px;
          height: 58px;
          transition: opacity 0.35s ease, height 0.35s ease,
            margin-bottom 300ms ease;
        }
        a.logo #realLogo {
          background-image: url("https://cdn2.infocasas.com.uy/web/5ee3722bdec05_infocdn__logo-infocasas@2x.png");
          position: absolute;
          bottom: 8px;
          width: 116px;
          height: 35px;
          background-size: contain;
          background-repeat: no-repeat;
          height: 37px;
          width: 100%;
          bottom: 0px;
        }
        @media screen and (max-width: 980px) {
          a.logo {
            height: 36px;
            width: 145px;
          }
          a.logo #realLogo {
            background-position: center;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default HeaderLogo;
