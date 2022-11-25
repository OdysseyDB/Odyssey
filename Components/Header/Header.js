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
          <ul className="Header__menu">
            <span data-icon={String.fromCodePoint(59574)}/>
            <li>Genre</li>
            <li>Platform</li>
          </ul>
          <AccentButton  isLink={true} href="#login">
            Login
          </AccentButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
