import React from "react";
import Animation from "./animation";
import { Link } from "react-router-dom";

function homeContent() {
  return (
    <div className="home-body">
      <Animation />
      <div className="btn-home">
        <i class="icon fas fa-users"></i>
        <Link to="/allusers">
          <button className="btn btn-lg btn-primary">View All Users</button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default homeContent;
