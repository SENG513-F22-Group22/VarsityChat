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

  const handleSignup = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const response = await axios.post('/api/signup', { email, password })
    console.log(response)
  }


    return (
      <>
        <Container className='container-fluid'>
          <h1 className="text-start fw-bold mt-4 ms-3">Sign Up</h1>
          <Card className="mx-3">
            <Card.Body>
              <Card.Title className="text-start">Create an account</Card.Title>
              <Card.Text className="text-start">
                {/* <form>
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
                    <input type="password" className="form-control" id="passwordInputConfirm" />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form> */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </>
    )
  }

  export default SignIn