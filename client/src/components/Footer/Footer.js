import React from "react";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import "./Footer.scss";
import Link from "../../components/Link/Link";

const Footer = () => {
  return (
    <footer className="footer">
      <Link href="https://facebook.com/">
        <IoLogoFacebook size={32} />
      </Link>
      <Link href="https://www.instagram.com/">
        <IoLogoInstagram size={32} />
      </Link>
      <Link href="https://twitter.com/">
        <IoLogoTwitter size={32} />
      </Link>
    </footer>
  );
};

export default Footer;
