import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const SignIn = ({ socket }) => {

  const handleSignin = async (e) => {
    e.preventDefault()
    const email = e.target.emailInput.value
    const password = e.target.passwordInput.value

    const response = await axios.post('http://localhost:4000/signin', {
      email,
      password
    })

    console.log(response.data);
  }


  return (
    <>
      <Container className='container-fluid'>
        <h1 className="text-start fw-bold mt-4 ms-3">Sign In</h1>
        <Card className="mx-3">
          <Card.Body>
            <Card.Title className="text-start">Sign In</Card.Title>
            <form onSubmit={handleSignin}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="passwordInput" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default SignIn