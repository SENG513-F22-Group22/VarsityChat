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

const SignUp = ({ socket }) => {

  const handleSignup = async (e) => {
    e.preventDefault()
    const email = e.target.emailInput.value
    const password = e.target.passwordInput.value
    const passwordConfirm = e.target.passwordConfirmInput.value

    if (password !== passwordConfirm) {
      alert("Passwords do not match")
      return
    }

    const response = await axios.post('http://localhost:4000/signup', {
      email,
      password
    })

    console.log(response.data);
  }


  return (
    <>
      <Container className='container-fluid'>
        <h1 className="text-start fw-bold mt-4 ms-3">Sign Up</h1>
        <Card className="mx-3">
          <Card.Body>
            <Card.Title className="text-start">Create an account</Card.Title>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">Must be your school email.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="passwordInput" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="passwordConfirmInput" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default SignUp