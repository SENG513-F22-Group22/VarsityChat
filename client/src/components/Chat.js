import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row,
  ButtonGroup,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const Chat = ({ socket }) => {
  const navigate = useNavigate()

  return (
    // 'html' code goes here 
    <>
      <Container>

        <h1>Chat page here!</h1>
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