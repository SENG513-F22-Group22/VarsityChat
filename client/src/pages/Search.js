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
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <h2 className="text-start fw-bold mt-4 ms-3">Search</h2>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>

        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <p className='border-bottom text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom'>Enrolled Classes</p>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>

        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <Container id="SearchCourseContainer" className="mt-2">
              {/* This is where ClassSearchItems are appended */}

              <ClassSearchItem courseName="SENG 513" />

              <ClassSearchItem courseName="CPSC 449" />
            </Container>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>

      </Container>
    </>
  )
}

export default Search