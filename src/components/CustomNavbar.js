
import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom'
import './style.css'


const CustomNavbar = (args) => {
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate()

    const toggleNavbar = () => setCollapsed(!collapsed);

    const logout = () => {
        localStorage.clear()

        navigate('/login')
    }

    const isLogin = localStorage.getItem('login')
    const navItems = <>
        <NavItem>
            <Link className='nav-link' to={'/question'} >Question</Link>
        </NavItem>
        {
            isLogin ?
                <NavItem>
                    <NavLink onClick={logout} href='#' >
                        <i className="fa fa-sign-out"></i>
                    </NavLink>
                </NavItem>
                :
                <>
                    <NavItem>
                        <Link className='nav-link' to={'/login'} >Login</Link>
                    </NavItem>
                    <NavItem>
                        <Link className='nav-link' to={'/register'} >Register</Link>
                    </NavItem>
                </>
        }


    </>

    return (
        <Navbar color="faded" light className='bg-light'>
            <Link to={'/'} className='me-auto navbar-brand' >
                Simple Stackoverflow clone
            </Link>
            <Nav className='nav-style'
            >
                {navItems}
            </Nav>
            <NavbarToggler onClick={toggleNavbar} className="me-2 toggler-style" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    {navItems}
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default CustomNavbar