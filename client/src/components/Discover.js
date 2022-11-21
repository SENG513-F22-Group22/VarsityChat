import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const Discover = ({ socket }) => {

  return (
    // 'html' code goes here 
    <>
      <Container>

        <h1>Discover page here</h1>
        <Card>
          <Button variant="danger" >Bootstrap button</Button>
        </Card>
      </Container>
    </>
  )
}

export default Discover