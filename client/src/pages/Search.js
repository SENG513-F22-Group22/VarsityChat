import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  ButtonGroup,
  Form,
  ListGroup
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import ClassSearchItem from '../components/ClassSearchItem';
import { ChevronRight } from 'react-bootstrap-icons';

const Search = ({ socket }) => {
  const navigate = useNavigate()
  return (
    // 'html' code goes here 
    <>
      <Container>
        <Row>
          <h2 className="text-start fw-bold mt-4 ms-3">Search</h2>
        </Row>

        <p className='border-bottom text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom'>Enrolled Classes</p>

        <Container className="mt-2">
          <ListGroup id="SearchClassSelection" variant="flush">
            {/* This is where ClassSearchItems are appended */}
            <ListGroup.Item>
              <Row className='classSearchItem align-items-center'>
                <Col xs={4}><p className="mt-1 mb-1">SENG 513</p></Col>
                <Col xs={7}></Col>
                <Col xs={1}>
                  <ChevronRight className="mb-1" color="black" size={20} />
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item><ClassSearchItem courseName="all" /></ListGroup.Item>
          </ListGroup>
        </Container>

      </Container>
    </>
  )
}

export default Search