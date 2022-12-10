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

const SignUp = (props) => {
  const { socket, setUserEmail } = props
  const navigate = useNavigate()

  if (localStorage.getItem('email')) {
    return (
      <>
        <h1>You are already signed in</h1>
        <a onClick={() => {
          localStorage.removeItem('email')
          setUserEmail("")
          navigate('/')
        }}
        >Sign Out</a>
      </>
    )
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const email = e.target.emailInput.value
    const password = e.target.passwordInput.value
    const passwordConfirm = e.target.passwordConfirmInput.value

    if (password !== passwordConfirm) {
      alert("Passwords do not match")
      return
    }

    try {
      const response = await axios.post('http://localhost:4000/signup', {
        email,
        password
      })

      if (response.status === 200) {
        localStorage.setItem('email', email)
        setUserEmail(email)
        navigate('/chat')
      }
    } catch (error) {
      alert("Email already exists")
    }

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
              <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
            <p className="text-center mt-3">Already have an account? <a href="/">Sign In</a></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default SignUp