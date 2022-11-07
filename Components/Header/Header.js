import React from "react";
import AccentButton from "../AccentButton/AccentButton";
import "./Header.scss";
import Logo from "./Logo/Logo";

function Header() {
  return (
    <div className="Header">
      <div className="Header__container">
        <div className="Header__container--left">
          <Logo />
        </div>
        <div className="Header__container--right">
          <AccentButton isLink={true} href="#login">
            Login
          </AccentButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
