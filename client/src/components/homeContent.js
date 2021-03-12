import React from "react";
import { Button } from "react-bootstrap";
import Clock from "./Clock";

function homeContent() {
  return (
    <div className="home-body row">
      <div className="col-lg-8 col-md-8">
      <div className="home-left-container">
        <h1>
          Welcome Admin
        </h1>
        <Clock />
      </div>
        
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="home-right-container">
            <div className="home-btn-container">
              <i className="icon fas fa-user-plus"></i>
            <Button href="#" variant="outline-primary">
              Create User
            </Button>{" "}
            </div>
            <div className="home-btn-container">
            <i className="icon fas fa-users"></i>
            <Button href="/users" variant="outline-primary">
              View All Users
            </Button>{" "}
            </div>
            <div className="home-btn-container">
            <i className="icon fas fa-user-edit"></i>
            <Button href="#" variant="outline-primary">
              Edit User
            </Button>{" "}
            </div>
            <div className="home-btn-container">
            <i className="icon fas fa-user-slash"></i>
            <Button href="#" variant="outline-primary">
              Delete User
            </Button>{" "}
            </div>
        </div>
      </div>
    </div>
  );
}

export default homeContent;
