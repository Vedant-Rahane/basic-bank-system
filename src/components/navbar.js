import React from "react";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <header>
      <Link to="/">
        <h1>bank</h1>
      </Link>
    </header>
  );
}

export default navbar;
