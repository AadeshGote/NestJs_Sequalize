import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiUserPlus } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import "./Navbar.css";

const NavBar = ({ handleShow, setIsEdit,searchQuery,handleSearch  }: any) => {
  const handleRegister = () => {
    setIsEdit(false);
    handleShow();
  };
  return (
    <>
      <Container fluid className="border  p-2" id="containerHead">
        <Row className="  d-flex align-items-center justify-content-center">
       
          <Col md="8" id="headName">
            User Accounts
          </Col>
          <Col md="2">
            <Form.Control
              type="text"
              placeholder="Search"
              id="custom-search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Col>
          <Col md="2">
            <Button id="addBtn" className="p-1" onClick={handleRegister}>
              <BiUserPlus size={20} /> REGISTER
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavBar;
