import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const Chat = ({ socket }) => {
  const navigate = useNavigate()

  return (
    // 'html' code goes here 
    <>
      <Container>

        <h1>Chat page here</h1>
        <Card>
          <Button variant="danger" onClick={() => navigate("/discover")} >Go to Discover page!</Button>
          <Button variant="primary" onClick={() => navigate("/profile")} >Go to Profile page!</Button>
          <Button variant="secondary" onClick={() => navigate("/signin")} >Go to SignIn page!</Button>
        </Card>
      </Container>
    </>
  )
}

export default Chat