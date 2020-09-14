import React from "react";
import logo from "../images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип Mesto.Russia" src={logo} />
      <div className="header__line"></div>
    </header>
  );
};

export default Header;
