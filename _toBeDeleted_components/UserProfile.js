const UserProfile = ({ currentUser }) => {
  return (
    <React.Fragment>
      <li id="userLogged">
        <a
          href={
            currentUser.isIndividual
              ? "/dashboard"
              : "/sitio/index.php?mid=inmobiliarias&func=panelPropiedades"
          }
        >
          <span className="avoid">
            <div
              className="user-profile-image imgAsBg"
              style={
                currentUser.logo != null
                  ? { backgroundImage: "url(" + currentUser.logo + ")" }
                  : null
              }
            ></div>
            <div className="user-profile-name">
              {currentUser.firstName ? currentUser.firstName : currentUser.name}
            </div>
            <i className="icon-angle-down avoid"></i>
          </span>
          <span
            className="text"
            style={{
              display: "block",
              opacity: "0",
              position: "relative",
              zIndex: "-1",
              height: "0px",
              width: "1px",
              overflow: "hidden",
            }}
          >
            User
          </span>
        </a>
      </li>
      <style jsx>{`
        #userLogged {
          position: relative;
          top: -10px;
        }
        #userLogged a {
          color: #77787b;
          padding: 0 15px 0px 12px;
          display: block;
          text-decoration: none;
          transition: all 0.35s ease;
        }
        #userLogged span {
          display: flex;
          align-items: center;
        }
        #userLogged i.icon-angle-down {
          font-size: 13px;
          position: relative;
        }
        .user-profile-image {
          height: 32px;
          width: 32px;
          border-radius: 60px;
          display: inline-block;
          position: relative;
          border: 0.17em solid #fff;
          background-position: center;
          background-image: url(https://cdn2.infocasas.com.uy/repo/img/user-profile.png);
          background-size: cover;
          margin-right: 10px;
        }
        .user-profile-name {
          display: inline-block;
          position: relative;
          text-align: left;
          line-height: 1em;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media screen and (max-width: 1100px) {
          .user-profile-name {
            max-width: 70px;
          }
        }
        @media screen and (max-width: 980px) {
          #userLogged {
            top: 0px;
          }
          #userLogged a {
            padding: 0px 11px;
            font-size: 16px;
          }
          #userLogged i.icon-angle-down {
            display: none;
          }
          .user-profile-name {
            max-width: calc(100% - 90px);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default UserProfile;
