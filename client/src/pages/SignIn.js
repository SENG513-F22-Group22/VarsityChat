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

const SignIn = (props) => {
  const { socket, setUserEmail } = props
  const navigate = useNavigate()

  
  const handleSignin = async (e) => {
    e.preventDefault()
    const email = e.target.emailInput.value
    const password = e.target.passwordInput.value

    try {
      const response = await axios.post('http://localhost:4000/signin', {
        email,
        password
      })

      if (response.status === 200) {
        localStorage.setItem('email', email)
        setUserEmail(email)
        navigate('/chat')
      }

    } catch (error) {
      if (error.response.status === 401) {
        alert("Incorrect email or password")
      }
      else {
        alert("Error")
      }
    }
  }

  if (localStorage.getItem('email')) {
    setUserEmail(localStorage.getItem('email'))
    navigate('/chat')
  }

  return (
    <>
      <Container className='container-fluid'>
        <h1 className="text-start fw-bold mt-4 ms-3">Sign In</h1>
        <Card className="mx-3">
          <Card.Body>
            <form onSubmit={handleSignin}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="passwordInput" />
              </div>
              <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
            <p className="text-center mt-3">Don't have an account? <a href="/signup">Sign Up</a></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default SignIn