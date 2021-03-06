import React from "react";
import Animation from "./animation";
import { Button } from "react-bootstrap";

function homeContent() {
  return (
    <div className="home-body">
      <Animation />
      <div className="btn-home">
        <i className="icon fas fa-users"></i>
        <Button href="/users" variant="outline-primary">
          View All Users
        </Button>{" "}
      </div>
    </div>
  );
}

export default homeContent;
