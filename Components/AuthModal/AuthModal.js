import React, { Component } from "react";
import "./AuthModal.scss";
import { useRouter } from "next/router";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import AccentButton from "../AccentButton/AccentButton";

export default function AuthModal() {
  const [hash, setHash] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setHash(window.location.hash);

    if (
      window.location.hash === "#login" ||
      window.location.hash === "#signup" ||
      window.location.hash === "#reset-password"
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);

      if (
        window.location.hash === "#login" ||
        window.location.hash === "#signup" ||
        window.location.hash === "#reset-password"
      ) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    });
  });

  React.useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="AuthModal">
          <div className="AuthModal__container">
            <span
              className="AuthModal__container--close"
              onClick={() => {
                setIsOpen(false);
                setHash("");
                window.location.hash = "";
                router.replace(window.location.pathname);
              }}
            >
              &#10799;
            </span>
            <h2>Odyssey</h2>
            <div className="AuthModal__tabs">
              <AccentButton
                style={{
                  height: "33px",
                  width: "100px",
                }}
                href="#login"
                isLink={true}
                className={hash === "#login" ? "route--active" : ""}
                onClick={() => {
                  setHash("#login");
                }}
              >
                Login
              </AccentButton>

              <AccentButton
                style={{
                  height: "33px",
                  width: "100px",
                }}
                href="#signup"
                isLink={true}
                className={hash === "#signup" ? "route--active" : ""}
                onClick={() => {
                  setHash("#signup");
                }}
              >
                Sign Up
              </AccentButton>
            </div>
            {hash === "#login" && (
              <Login
                onLogin={() => {
                  setIsOpen(false);
                  setHash("");
                  window.location.hash = "";
                  router.replace(window.location.pathname);
                }}
              />
            )}
            {hash === "#signup" && (
              <SignUp
                onSignUp={() => {
                  setIsOpen(false);
                  setHash("");
                  window.location.hash = "";
                  router.replace(window.location.pathname);
                  router.reload();
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
