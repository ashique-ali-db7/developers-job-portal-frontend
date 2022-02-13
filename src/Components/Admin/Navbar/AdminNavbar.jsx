import React from "react";
import { Nav, Container, NavDropdown, Navbar } from "react-bootstrap";
import "./AdminNavbar";

function AdminNavbar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">DeveloperHub</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link className="me-auto">Admin Panel</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
