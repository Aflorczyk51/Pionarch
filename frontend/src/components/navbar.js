import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import './Navbar.css'; // Import your custom CSS file

// Here, we display our Navbar
export default function Navbar() {
  return (
    <ReactNavbar className="custom-navbar" fixed="bottom">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Start</Nav.Link>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
