import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
    <Navbar bg="dark">
      <Container fluid>
        <Navbar.Brand href="" className="custom-navbar-brand">
          Lighten Academy
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
            <Nav.Link href="/account" className='custom-nav-link'>
              Account
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
