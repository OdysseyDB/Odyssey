import Link from "next/link";
import React from "react";
import useAuth from "../../hooks/useAuth";
import AccentButton from "../AccentButton/AccentButton";
import "./Header.scss";
import Logo from "./Logo/Logo";

function Header() {
  const { user } = useAuth();
  return (
    <div className="Header">
      <div className="Header__container">
        <div className="Header__container--left">
          <Logo />
        </div>
        <div className="Header__container--right">
          <ul className="Header__menu">
            {/* <span data-icon={String.fromCodePoint(59574)} /> */}
            <li>
              <Link href="/#genre">
                <a>Genre</a>
              </Link>
            </li>
            <li>
              <Link href="/#platform">
                <a>Platform</a>
              </Link>
            </li>
          </ul>
          {!user ? (
            <AccentButton isLink={true} href="#login">
              Login
            </AccentButton>
          ) : (
            <AccentButton
              style={{
                backgroundColor: "lightgreen",
                color: "#454545",
              }}
              isLink={true}
              href="/my/dashboard"
            >
              Profile
            </AccentButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
