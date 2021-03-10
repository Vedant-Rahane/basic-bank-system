import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer">
      <div className="container-fluid">
        <p>&copy; {year} Copyright Indian Bank Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
