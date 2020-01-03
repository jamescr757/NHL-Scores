import React, { useState } from "react";
import "./NavBar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { TeamDropdown } from "./TeamDropdown";
import { DivisionDropdown } from "./DivisionDropdown";
import { ConferenceDropdown } from "./ConferenceDropdown";

const NavBar = (props) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">NHL Scores</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <TeamDropdown />

            <DivisionDropdown />

            <ConferenceDropdown />
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
  );
}

export default NavBar;