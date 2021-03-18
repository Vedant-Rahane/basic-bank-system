import React from "react";
import "./css/Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer">
      <div className="container-fluid">
        <p>&copy; {year} Copyright TSF Bank Ltd.</p>
        <p>Made by Vedant Rahane.</p>
      </div>
    </footer>
  );
}

export default Footer;
