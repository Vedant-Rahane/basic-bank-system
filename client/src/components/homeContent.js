import React from "react";
import Animation from "./animation";
import { Button } from "react-bootstrap";

function homeContent() {
  return (
    <div className="home-body row">
      <div className="col-lg-8 col-md-8 home-elements-container">
        <Animation />
      </div>
      <div className="col-lg-4 col-md-4 home-elements-container">
        <i className="icon fas fa-users"></i>
        <Button href="/users" variant="outline-primary">
          View All Users
        </Button>{" "}
      </div>
    </div>
  );
}

export default homeContent;
