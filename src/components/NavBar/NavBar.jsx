import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoutButton from "../Buttons/LogoutButton";
import TooltipComponent from "../Tooltips/TooltipComponent";
import ProfileButton from "../Buttons/ProfileButton";
import { Link } from "react-router-dom";


function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Trade Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/upload">Upload Trades</Nav.Link>
            <TooltipComponent message="Create Edit & Delete Tags" placement="bottom">
              <Nav.Link as={Link} to="/tags">Tags</Nav.Link>
            </TooltipComponent>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <ProfileButton />
              <LogoutButton />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
