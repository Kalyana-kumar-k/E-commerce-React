import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";

function NavBarTab() {
  let navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Shopify</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/login/Selvam"}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to={"/signup"}>
              Signup
            </Nav.Link>
            <Nav.Link as={Link} to={"/products"}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to={"/todo"}>
              To Do List
            </Nav.Link>
          </Nav>
          <Button
            variant="warning"
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <BsFillCartCheckFill />
          </Button>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarTab;
