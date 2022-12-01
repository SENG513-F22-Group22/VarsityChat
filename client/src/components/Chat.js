import React, { useState } from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  ButtonGroup,
  Form,
  Image,
  Badge,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const Chat = ({ socket }) => {
  const navigate = useNavigate()

  return (
    // 'html' code goes here 
    <>
      <Container>

        <h1 className="text-start fw-bold mt-4 ms-3">Chat</h1>

        <Form className="d-flex mx-3">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>

        <p className='text-black-50 text-start ms-2 mt-3 negative-margin-bottom'>Conversations</p>

        <Container id="chat-container">
          {/* Use this row's styling for profile results */}
          <Row className='border-top align-items-center'>
            <Col xs={2}><Image src="default_prof.png" className="align-middle rounded-circle" width="50"></Image></Col>
            <Col xs={1}></Col>
            <Col xs={5}><p className="mb-0 pt-3 fw-bold">Name</p><p className="small fw-lighter text-muted">Time</p></Col>
            <Col><Badge variant="primary">1</Badge></Col>
            <Col xs={1}><ChevronRight color="black" size={20}></ChevronRight></Col>
          </Row>
          <Row className='border-top'>
            <Col xs={2}><Image src="default_prof.png" className="align-middle rounded-circle" width="50"></Image></Col>
            <Col xs={1}></Col>
            <Col xs={5}><p className="text-start pt-1 mb-0 fw-bold">Name</p><p className="small text-start fw-lighter text-muted">Time</p></Col>
            <Col><Badge className="mt-3" variant="primary">1</Badge></Col>
            <Col xs={1}><ChevronRight color="black" className="mt-3 mr-1" size={20}></ChevronRight></Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Chat