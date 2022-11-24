import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  ButtonGroup,
  Form,
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

        <Container className="border-top" id="chats">
          <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>

        <Card className="fixed-bottom" variant="bottom">
          <ButtonGroup size="lg">
            <Button variant="light" onClick={() => navigate("/search")} >Search</Button>
            <Button disabled variant="dark" onClick={() => navigate("/chat")} >Chat</Button>
            <Button variant="light" onClick={() => navigate("/profile")} >Profile</Button>
          </ButtonGroup>
        </Card>

      </Container>
    </>
  )
}

export default Chat