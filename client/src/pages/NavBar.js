import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Container, Spinner } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { UserContext } from '../context/Usercontext.js';

function NavBar() {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <Navbar bg="dark">
        <Container fluid>
          <Navbar.Brand href="" className="custom-navbar-brand">
            <img src="/logo-white.png" alt="Logo" className="logo" style={{ width: '90px', height: '56.7px' }} /> 
          </Navbar.Brand>
          <Spinner animation="border" variant="light" className="mr-2" />
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="dark">
      <Container fluid>
        <Navbar.Brand href="" className="custom-navbar-brand">
          <img src="/logo-white.png" alt="Logo" className="logo" style={{ width: '90px', height: '56.7px' }} /> 
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" className="custom-nav-link">
            Home
          </Nav.Link>
          <Nav.Link href="/exercise" className="custom-nav-link">
            Exercise
          </Nav.Link>
          <Nav.Link href="/aboutUs" className="custom-nav-link">
            About us
          </Nav.Link>
        </Nav>
        <Nav>
          {user && user.emailVerified ? (
            <Nav.Link href="/account" className="custom-nav-link">
              Account
            </Nav.Link>
          ) : (
            <Nav.Link href="/login" className="custom-nav-link">
              Log in
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
