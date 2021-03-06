import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function navbar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Indian Bank</Navbar.Brand>
      <Nav className="ml-auto navbar-nav">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/users">View Users</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default navbar;
