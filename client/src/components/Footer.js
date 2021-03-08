import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer">
      <div class="container-fluid">
        <p>&copy; {year} Copyright Indian Bank Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
