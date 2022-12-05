import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row,
  ButtonGroup,
  Form
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const Search = ({ socket }) => {
  const navigate = useNavigate()
  return (
    // 'html' code goes here 
    <>
      <Container>
        <Row>
          <h2 className="text-start fw-bold mt-4 ms-3">Search</h2>
        </Row>
        <Row>
          <Form className="d-flex mx-3">
            <Form.Control
              type="search"
              placeholder="Search by Course Name"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Row>

        <Container className="mt-4">

        </Container>

      </Container>
    </>
  )
}

export default Search