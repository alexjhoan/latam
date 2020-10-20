import theme from "../styles/theme";
import ImagenOptimizada from "./ImagenOptimizada";

const HeaderButton = ({ button, action }) => {
  const removeSpecialChars = (string) => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  let button_attr = {
    href: button.url,
    title: button.title,
  };
  if (typeof action != "undefined") button_attr = { onClick: () => action() };

  const btn_text = removeSpecialChars(button.text)
    .toLocaleLowerCase()
    .split(" ")
    .join("-");
  return (
    <React.Fragment>
      <li className={button.classname}>
        <a {...button_attr} className={"header-btn-" + btn_text}>
          {button.image != null ? (
            <span className="image">
              <ImagenOptimizada
                src={button.image}
                alt={button.text}
                minWidth={"150"}
              />
            </span>
          ) : null}
          <span className="innertext">
            <span className="text">{button.text}</span>
            <i className="icon-angle-right"></i>
          </span>
        </a>
      </li>

      <style jsx>{`
        li a {
          text-decoration: none;
          transition: all 0.35s ease;
          display: inline-block;
          width: 100%;
        }
        li a span.innertext i.icon-angle-right {
          display: none;
        }

        // NAV
        li.default {
          text-transform: uppercase;
          font-size: 13px;
          float: left;
          margin-left: 10px;
          height: 25px;
          display: flex;
          align-items: center;
        }

        li.default a {
          color: #4e4e4e;
          letter-spacing: 0.7px;
        }
        li.default a:hover {
          text-decoration: none;
          color: #fc830b;
        }

        // PUBLICAR
        .publish {
          float: right;
        }
        .publish a {
          border-radius: 3px;
          background: ${theme.colors.primary};
          color: white !important;
          cursor: pointer;
          padding: 6px 10px;
          text-transform: capitalize;
          display: inline-block;
          max-width: 100%;
          box-sizing: border-box;
        }
        .publish a:hover {
          background: ${theme.colors.primaryHover};
        }
        li.publish_options {
          border-right: solid 1px #ddd;
          box-sizing: border-box;
          cursor: pointer;
          display: block;
          float: left;
          height: 230px;
          padding: 20px 10px;
          position: relative;
          text-align: center;
          vertical-align: top;
          width: 150px;
          transition: all 0.35s ease;
        }
        li.publish_options .image {
          display: inline-block;
          height: 154px;
          width: 114px;
        }
        li.publish_options .image :global(img) {
          width: 100%;
        }
        li.publish_options .innertext {
          bottom: 20px;
          display: inline-block;
          font-weight: bold;
          left: 20px;
          line-height: 1;
          height: 30px;
          position: absolute;
          width: 109px;
          text-transform: capitalize;
          color: ${theme.colors.textLight};
        }
        li.publish_options:hover {
          opacity: 0.8;
        }

        // USER_ACTION
        .register,
        .iniciar_sesion,
        .magazine,
        .contact {
          float: right;
          line-height: 25px;
          border-right: 1px solid #ddd;
          text-align: center;
          padding: 0 12px;
          color: ${theme.colors.text};
          text-transform: capitalize;
          cursor: pointer;
        }
        .register,
        .contact {
          border-right: none;
        }
        .register:hover,
        .iniciar_sesion:hover {
          color: ${theme.colors.textHover};
        }
        li.user_action_option {
          display: block;
          border: 0;
          float: none;
          text-align: left;
          background-color: #ffffff;
          transition: all 0.3s ease;
          color: ${theme.colors.text};
          line-height: 20px;
          cursor: pointer;
          border-radius: 3px;
          overflow: hidden;
        }
        li.user_action_option:hover {
          background-color: #eeeeee;
        }
        li.user_action_option a {
          color: ${theme.colors.text};
          padding: 7px 9px;
          box-sizing: border-box;
        }

        @media screen and (max-width: 980px) {
          .publish {
            width: calc(100% - 22px);
            margin: 15px auto;
            float: none;
          }
          :global(li.dropdown_button.publish) .publish {
            width: 100%;
          }
          li a {
            width: 100%;
          }
          li.default {
            border-top: 1px solid #ddd;
            float: none;
            height: auto;
            line-height: 50px;
            min-height: 50px;
            text-align: left;
            width: 100%;
            border-right: 0px;
            border-left: 0px !important;
            order: 5;
            text-transform: none;
            margin-left: 0px;
            text-transform: capitalize;
          }
          li.default:nth-child(3) {
            border-top: none;
          }
          li.default a {
            letter-spacing: initial;
            padding: 0 11px 0 11px;
            font-size: 16px;
          }
          .register,
          .iniciar_sesion {
            background-color: #4db7ad;
            color: #fff;
            padding: 11px 10px;
            font-size: 17px;
            cursor: pointer;
            display: block;
            width: 85%;
            margin: 0 10% 10px 5%;
            border-radius: 6px;
            text-align: center;
            float: none;
            box-sizing: border-box;
          }

          .publish a {
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            color: #fff !important;
            font-weight: bold;
            background-color: #ff7043;
            padding: 0px 11px;
            font-size: 16px;
            line-height: 50px;
          }
          .publish a:hover {
            background-color: #ff7043;
          }
          li.publish_options {
            border-right: none;
            box-sizing: border-box;
            float: none;
            height: auto;
            padding: 15px 0px;
            position: relative;
            text-align: center;
            width: 100%;
            transition: all 0.35s ease;
          }
          li.publish_options a {
            width: 100%;
            display: flex;
            align-items: center;
          }
          li.publish_options .image {
            display: inline-block;
            float: left;
            height: auto;
            max-width: 60px;
            padding-right: 2%;
            width: 60px;
            margin-right: 10px;
          }
          li.publish_options .image img {
            height: auto;
            width: 100%;
            max-width: 60px;
          }
          li.publish_options .innertext {
            bottom: 0px;
            left: 0px;
            position: relative;
            height: auto;
            float: left;
            display: inline-block;
            text-align: left;
            width: 47%;
            font-size: 16px;
          }
          li.publish_options a span.innertext i.icon-angle-right {
            display: block;
            float: right;
            font-size: 46px;
            position: absolute;
            right: -50px;
            top: 50%;
            transform: translateY(-50%);
          }
          li.publish_options:hover {
            opacity: 1;
          }
          li.user_action_option {
            height: 40px;
            padding: 0px 11px;
            display: flex;
            align-items: center;
          }
          li.user_action_option:hover {
            background-color: #ffffff;
            opacity: 0.8;
          }
          li.titleSection {
            background-color: #f1f1f1 !important;
            color: #6b6b6b;
            font-weight: 400;
            margin-top: 15px;
            cursor: auto;
            height: auto;
            line-height: 30px !important;
            min-height: 30px !important;
            color: #77787b;
            padding: 0px 11px;
          }
          li.titleSection:hover {
            background-color: #f1f1f1;
          }
          li.titleSection a {
            color: #77787b;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default HeaderButton;
