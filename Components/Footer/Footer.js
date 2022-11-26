import Link from "next/link";
import Logo from "../Header/Logo/Logo";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="FooterWrapper" id="contact">
      <div className="FooterWrapper__container">
        <div className="FooterWrapper__left">
          <Logo
            style={{
              height: "80px",
              fontSize: "59px",
              padding: "20px",
              marginTop: "20px",
            }}
          />
          <p className="FooterWrapper__left--copyrightUnderLogo">
            © 2022 Odyssey. All Rights Reserved
          </p>
        </div>

        <div className="FooterWrapper__right">
          <ul className="FooterWrapper__right--Service">
            <li className="FooterWrapper__right--rowHeading">Pages</li>
            <li>
              <Link href="/">
                <a className="FooterWrapper__right--rowItem">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/#genre">
                <a className="FooterWrapper__right--rowItem">Genre</a>
              </Link>
            </li>
            <li>
              <Link href="/platform">
                <a className="FooterWrapper__right--rowItem">Platform</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="FooterWrapper__left--Copyright">Odyssey copyright @2022</p>
    </div>
  );
}
