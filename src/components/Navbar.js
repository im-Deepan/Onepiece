import React from 'react';
import { Navbar, Nav, Container, Form, Button, Image } from 'react-bootstrap';
import GoogleSignInButton from './GoogleSignInButton';
import { useUser } from '../context/UserContext'; // 👈 import context

function TopNavbar({ darkMode, toggleDarkMode }) {
  const { user, setUser } = useUser(); // 👈 access user info

  const handleLogout = () => {
    setUser(null); // clear user from context
    console.log("🔴 Logged out");
  };

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

            {user ? (
              <>
                <div className="d-flex align-items-center me-3">
                  <Image
                    src={user.picture}
                    roundedCircle
                    width="35"
                    height="35"
                    className="me-2"
                    alt={user.name}
                  />
                  <span className="me-2 text-nowrap">{user.name}</span>
                </div>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="me-2">
                <GoogleSignInButton />
              </div>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
