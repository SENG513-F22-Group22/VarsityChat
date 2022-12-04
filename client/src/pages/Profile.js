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

const Profile = ({ socket }) => {
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.removeItem('email')
    navigate('/signin')
  }

  return (
    // 'html' code goes here 
    <>
      <Container>

      <h1 className="text-start fw-bold mt-4 ms-3">Profile</h1>
        <Button onClick={signOut}>Sign Out</Button>


      </Container>
    </>
  )
}

export default Profile