import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap
import { useNavigate } from 'react-router-dom';

// Here, we display our Navbar
export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <ReactNavbar className="custom-navbar" fixed="bottom">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Start</Nav.Link>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
        </Nav>
        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
      </Container>
    </ReactNavbar>
  );
}
