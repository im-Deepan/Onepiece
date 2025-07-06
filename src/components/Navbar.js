import React from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import GoogleSignInButton from './GoogleSignInButton';

function TopNavbar({ darkMode, toggleDarkMode }) {
  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          🏴‍☠️ One Piece
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
          </Nav>
          <Form className="d-flex align-items-center">
            <Form.Check
              type="switch"
              id="dark-mode-switch"
              label="Dark Mode"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="me-3"
            />
            <div className="me-2">
              <GoogleSignInButton />
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
