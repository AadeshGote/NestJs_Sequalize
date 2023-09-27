import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import "./Navbar.css";
import { BiUserPlus } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import setShow from "../modal/Modal"

const NavBar = ({handleShow}:any) => {
  return (
    <>
      <Container fluid className="border text-center p-3" id="container">
        <Row className="  d-flex align-items-center justify-content-center">
          <Col md="1">
            <Button variant="danger" id="filter" className="p-1">
              <BsFilterLeft size={20}/>FILTER
            </Button>
          </Col>
          <Col md="1">
            <Button variant="warning" id="reset" className="p-1">
             <FiRefreshCw size={20}/> RESET
            </Button>
          </Col>
      
          <Col md="4" id="headName">
            User Accounts
          </Col>
          <Col md="2">
            <Form.Control type="text" placeholder="Search" id="custom-search" />
          </Col>
          <Col md="2">
            <Button id="addBtn" className="p-1" onClick={handleShow}>
              <BiUserPlus size={20} /> REGISTER
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavBar;
