import { useState, useRef } from "react";
import WindowEventListener from "./WindowEventListener.js";

const HeaderDropdown = ({ classname, children, buttonHeader, hover }) => {
  const [openDropdown, toggleDropdown] = useState(false);
  const dropdown = useRef(null);

  const action = () => {
    if (!hover) toggleDropdown(!openDropdown);
  };
  const styleDropdown = { display: openDropdown ? "flex" : "none" };

  const handleClickOutside = (event) => {
    if (
      openDropdown &&
      dropdown.current != null &&
      !dropdown.current.contains(event.target)
    )
      toggleDropdown(false);
  };
  if (!hover) WindowEventListener("click", handleClickOutside, false);

  return (
    <React.Fragment>
      <li className={"dropdown_button " + classname}>
        <ul onClick={() => action()}>{buttonHeader}</ul>
        <ul
          className={"dropdown " + classname}
          style={hover ? {} : styleDropdown}
          ref={dropdown}
        >
          {children}
        </ul>
      </li>
      <style jsx>{`
        li.dropdown_button.publish {
          float: right;
          position: relative;
          display: inline-block;
        }
        li.dropdown_button .dropdown {
          display: none;
          position: absolute;
          z-index: 220;
        }
        li.dropdown_button:hover .dropdown {
          display: ${hover ? "flex" : "inherit"};
        }
        li.dropdown_button.publish .dropdown {
          background: #fff;
          box-shadow: 1px 1px 4px rgba(23, 20, 20, 0.52);
          display: none;
          height: 230px;
          margin-top: 30px;
          position: absolute;
          right: -20px;
          top: 100%;
        }
        li.dropdown_button.publish .dropdown:before {
          content: "";
          height: 20px;
          position: absolute;
          top: -24px;
          right: 42px;
          border: 12px solid transparent;
          border-bottom-color: white;
          width: 0px;
          height: 0px;
        }
        li.dropdown_button.user_profile {
          float: right;
          display: inline-block;
          position: relative;
          top: 5px;
        }
        li.dropdown_button.user_profile .dropdown {
          text-align: left;
          border: 1px solid #cccccc;
          padding: 0;
          position: absolute;
          top: calc(100% - 4px);
          box-shadow: 1px 1px 4px rgba(23, 20, 20, 0.52);
          border-radius: 3px;
          flex-direction: column;
          background: white;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 3px;
          width: calc(100% - 32px);
          min-width: 175px;
        }
        li.dropdown_button.user_profile .dropdown:before {
          content: "";
          display: inline-block;
          position: absolute;
          top: -10px;
          right: calc(50% - 12px);
          bottom: auto;
          border: 10px solid transparent;
          border-top: 0;
          border-bottom-color: rgba(0, 0, 0, 0.1);
        }
        @media screen and (max-width: 980px) {
          li.dropdown_button.publish {
            display: block;
            width: calc(100% - 22px);
            float: none;
            margin: 16px auto 0px;
          }
          li.dropdown_button.publish ul {
            width: 100%;
          }
          li.dropdown_button.publish .dropdown {
            position: static;
            box-shadow: none;
            flex-direction: column;
            height: auto;
            border-bottom: 1px solid #ddd;
          }
          li.dropdown_button.publish .dropdown:before,
          li.dropdown_button.user_profile .dropdown:before {
            display: none;
          }
          li.dropdown_button.user_profile {
            width: 100%;
            top: 0px;
          }
          li.dropdown_button.user_profile .dropdown {
            display: block;
            position: static;
            box-shadow: none;
            border: none;
            font-size: 16px;
            width: 100%;
            padding: 10px 0px 15px;
            border-bottom: 1px solid #ddd;
            transform: none;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default HeaderDropdown;
