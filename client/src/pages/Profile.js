import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row,
  ButtonGroup,
  Col,
  Image,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import SaveTrigger from '../components/SaveTrigger';

const Profile = ({ socket }) => {
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)

  const signOut = () => {
    localStorage.removeItem('email')
    navigate('/')
  }

  return (
    // 'html' code goes here 
    <>
      <Container>
        <Row>
          <Col xs={2}><h2 className="text-start fw-bold mt-4 ms-3">Profile</h2></Col>
          <Col xs={6}></Col>
          <Col xs={4}><Button variant="outline-primary" size="sm" className="mt-4 ms-2" onClick={signOut}>Sign Out</Button></Col>
        </Row>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}><Image src="default_prof.png" className="middle rounded-circle" width="110"></Image></Col>
          <Col xs={4}></Col>
        </Row>
        <Row>
          <Col xs={6}>
            <p className='text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom'>Account Details</p>
          </Col>
          <Col xs={3}></Col>
          <Col xs={3}>
            <SaveTrigger edit={edit} setEdit={setEdit} />
          </Col>
        </Row>
        <Container>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder={localStorage.getItem('email')} disabled />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="e.g. Steve" disabled={edit} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="forLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="e.g. Stevenson" disabled={edit} />
          </Form.Group>
          <p className='text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom'>Enrolled Classes</p>

        </Container>

      </Container>
    </>
  )
}

export default Profile