import React, { useEffect, useState } from "react";
// Import components here from https://react-bootstrap.github.io/layout/grid/
import axios from "axios";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SaveTrigger from "../components/SaveTrigger";

const Profile = (props) => {
  const { socket, userEmail } = props;
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [fName, setFName] = useState("Enter a first name...");
  const [lName, setLName] = useState("Enter a last name...");
  let defaultFirstName = "Enter a first name...";
  let defaultLastName = "Enter a last name...";

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/");
      return;
    } else {
      axios
        .get("http://localhost:4000/profileName", {
          params: {
            email: userEmail,
          },
        })
        .then((res) => {
          if (res.data.fName !== "") {
            setFName(res.data.fName);
          }

          if (res.data.lName !== "") {
            setLName(res.data.lName);
          }
        });
    }
  }, [userEmail]);

  const signOut = () => {
    localStorage.removeItem("email");
    // force reload of page
    window.location.reload();
    navigate("/");
  };

  return (
    // 'html' code goes here
    <>
      <Container>
        <Row
        // className="bg-light"
        >
          <Col xs={0} lg={3}></Col>
          <Col lg={4} xs={7}
          // className="bg-primary"
          >
            <h2 className="text-start fw-bold mt-4 ms-3">Profile</h2>
          </Col>
          <Col xs={4} lg={2}
            // className="bg-danger"
            align="right"
          >
            <Button
              variant="outline-primary"
              size="sm"
              className="mt-4 ms-2"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </Col>
        </Row>
        <Row>
          <Col
          // className="bg-success"
          >
            <Image
              src="default_prof.png"
              className="position-relative top-50 start-50 translate-middle"
              width="110"
            ></Image>
          </Col>
        </Row>
        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={4} xs={7}
          // className="bg-primary"
          >
            <p className="text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom">
              Account Details
            </p>
          </Col>
          <Col xs={4} lg={2}
            align="right"
          >
            <SaveTrigger
              edit={edit}
              setEdit={setEdit}
              fName={fName}
              lName={lName}
              userEmail={userEmail}
              defaultFirstName={defaultFirstName}
              defaultLastName={defaultLastName}
            />
          </Col>
          <Col sm={0} lg={4}></Col>
        </Row>
        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder={localStorage.getItem("email")}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={fName}
                onChange={(e) => {
                  setFName(e.target.value);
                }}
                disabled={!edit}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={lName}
                onChange={(e) => {
                  setLName(e.target.value);
                }}
                disabled={!edit}
              />
            </Form.Group>
            <p className="text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom">
              Enrolled Courses
            </p>
            <ul className="class_list">
              <li>SENG 513</li>
              <li>SENG 550</li>
              <li>CPSC 481</li>
              <li>CPSC 413</li>
              <li>CPSC 441</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
