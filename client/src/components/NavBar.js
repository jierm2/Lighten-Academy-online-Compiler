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
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
          <Nav.Link href="/playground" className="custom-nav-link">
            Playground
          </Nav.Link>
          <Nav.Link href="/exercise" className="custom-nav-link">
            Exercise
          </Nav.Link>
          <Nav.Link href="/aboutUs" className="custom-nav-link">
            About us
          </Nav.Link>
        </Nav>
        <Nav>
          {isLoading ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Spinner animation="grow" variant="light" size="sm" role="status" aria-hidden="true" style={{
                      position: 'absolute', left: '30%', top: '20%'}} />
              <span style={{visibility: 'hidden'}}>Account</span>
            </div>
          ) : (
            <>
              {user && user.emailVerified && (
                <Nav.Link href="/account" className="custom-nav-link">
                  Account
                </Nav.Link>
              )}
              {!user && (
                <Nav.Link href="/login" className="custom-nav-link">
                  Log in
                </Nav.Link>
              )}
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
