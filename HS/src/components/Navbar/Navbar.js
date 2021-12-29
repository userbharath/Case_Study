import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

import './navstyle.css'
function Navibar({ currentUser, logoutUser }) {

    const [isOpen, setIsOpen] = useState(false);
    let redirect = false;

    const toggle = () => setIsOpen(!isOpen);
    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser();
    }
    return (
        <div>

            <Navbar className="navbar navbar-light" light expand="md">
                <Container>
                    <NavbarBrand href="/home">Hotel VV Grand</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="navbar-nav ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/home">Home</NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="/guest">Add Guest</NavLink>
                            </NavItem> */}

                            {/* <NavItem>
                                <NavLink href="/Room">Room Management</NavLink>
                            </NavItem> */}
                            {/* <NavItem>
                                <NavLink href="/staff">Staff</NavLink>
                            </NavItem> */}
                            {/* <NavItem>
                                <NavLink href="/user">User</NavLink>
                            </NavItem> */}
                            {!currentUser.isAuthenticated && (<>

                                <NavItem>
                                    <NavLink className="login" href="/auth">signup</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="login" href="/auth">login</NavLink>
                                </NavItem></>)}
                            {currentUser.isAuthenticated && <><NavItem>
                                <NavLink href="/reservation">Booking</NavLink>
                            </NavItem>
                                <NavItem>
                                    <NavLink href={`/reservation/DeleteReservation/${currentUser.guestId}`}>Cancel Booking</NavLink>
                                </NavItem>
                                <NavItem><NavLink className="login" onClick={(e) => handleLogout(e)}>logout</NavLink></NavItem></>}
                            {/* <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                        </Nav>
                        {/* <NavbarText>Simple Text</NavbarText> */}
                    </Collapse>
                </Container>
            </Navbar>


        </div>
    );




}

export default Navibar

