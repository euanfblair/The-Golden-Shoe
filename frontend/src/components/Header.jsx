import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Cart, PersonCircle } from 'react-bootstrap-icons';
import jwtDecode from 'jwt-decode';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userLogged = false;
    let dropdownTitle = "Account";

    // Decode the token to get user information
    if(token){
        const decodedToken = jwtDecode(token);
        dropdownTitle = `Hi, ${decodedToken.name}`;
        userLogged = true;
    }

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Golden Shoe</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/products">
                            Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart">
                            <Cart /> Cart
                        </Nav.Link>
                        <NavDropdown title={<><PersonCircle /> {dropdownTitle}</>} id="username">
                            {!userLogged ? (
                                <>
                                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                                </>
                            ) : (
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
