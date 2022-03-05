import React, { useContext } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import DarkLogo from '../images/DarkLogo.png';
import LightLogo from '../images/LightLogo.png';
import ThemeContext from '../context/context';


export default function NavBarComponent() {
    const { darkTheme, setDarkTheme } = useContext(ThemeContext);

    const themeHandler = () => {
        setDarkTheme(!darkTheme);
    }

    const logo = darkTheme ? DarkLogo : LightLogo;
    const bg = darkTheme ? 'rgb(70,70,92)' : '#f1f1f8';
    const icon = darkTheme ? faMoon : faSun;
    const variantBtn = darkTheme ? 'outline-light' : 'outline-secondary'

    return (
        <Navbar style={{ backgroundColor: bg }} expand="lg">
            <Container fluid>
                <Navbar.Brand><Link to="/"><img src={logo} alt="Logo" width="250" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className="btn-light" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-lg-0"></Nav>
                    <Link to='/Register'><Button style={{ fontWeight: 'bold', background: 'rgb(87,73,173)', border: 'none' }} className="mx-2" variant="primary">REGISTER</Button></Link>
                    <Link to='/Login'><Button style={{ fontWeight: 'bold', background: 'rgb(0,118,111)' }} className="mx-2" variant="success">LOGIN</Button></Link>
                    <Button style={{ fontWeight: 'bold' }} onClick={themeHandler} className="mx-2" variant={variantBtn}><FontAwesomeIcon icon={icon} /></Button>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
