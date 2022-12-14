import React, { useEffect, useState } from "react";
// Import components here from https://react-bootstrap.github.io/layout/grid/
import axios from "axios";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClassSearchItem from "../components/ClassSearchItem";

const Search = ({ socket }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/");
      return;
    }

    // get all classes from database
    axios
      .get("http://localhost:4000/classes", {
        params: {
          email: localStorage.getItem("email"),
        },
      })
      .then((res) => {
        setClasses(res.data.classes);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    // had issues merging this code (mismatched brackets somewhere)
    // 'html' code goes here
    <>
      <Container>
        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <h2 className="text-start fw-bold mt-4 ms-3">Search</h2>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>

        <Row className="mb-0">
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <p className="border-bottom text-black-50 text-start ms-2 mt-2 pb-2 mb-0">
              Enrolled Courses
            </p>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>

        <Row className="mt-0">
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            {/* This is where ClassSearchItems are appended */}
            <ListGroup id="SearchClassSelection" variant="flush">
              {loading ? (
                <p>loading...</p>
              ) : (
                classes.map((course) => (
                  <ListGroup.Item key={course}
                    style={{ cursor: "pointer" }}
                  >
                    <ClassSearchItem courseName={course} key={course} />
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Search;
