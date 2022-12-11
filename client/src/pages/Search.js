import React, { useState, useEffect } from 'react'
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
import axios from 'axios';

const Search = ({ socket }) => {
  const [classes, setClasses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('email')) {
      navigate('/')
      return;
    }

    // get all classes from database
    axios.get('http://localhost:4000/classes', {
      params: {
        email: localStorage.getItem('email')
      }
    }).then((res) => {
      setClasses(res.data.classes)
      setClasses([
        "CPSC 481",
        "SENG 513",
        "SENG 550",
        "CPSC 413",
        "CPSC 441"
      ])
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    // had issues merging this code (mismatched brackets somewhere)
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

        <Row className="mb-0">
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <p className='border-bottom text-black-50 text-start ms-2 mt-2 pb-2 mb-0'>Enrolled Courses</p>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>

        <Row className="mt-0">
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            {/* This is where ClassSearchItems are appended */}
            <ListGroup id="SearchClassSelection" variant="flush">
              {classes.map((course) => (
                <ListGroup.Item key={course}>
                  <ClassSearchItem
                    courseName={course}
                    key={course}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>

          </Col>
        </Row>
      </Container>
    </>

  )
}

export default Search

// old code from merging
// {/* <Container className="mt-2">
// <ListGroup id="SearchClassSelection" variant="flush">
//   {/* This is where ClassSearchItems are appended */}
//   <ListGroup.Item>
//   <ClassSearchItem courseName="SENG 513" />
//   </ListGroup.Item>
//   <ListGroup.Item><ClassSearchItem courseName="all" /></ListGroup.Item>
// </ListGroup>
// </Container> */}

    // {/* 'html' code goes here
    // <>
    //   <Container>
    //     <Row>
    //       <h2 className="text-start fw-bold mt-4 ms-3">Search</h2>
    //     </Row>

    //     <p className='border-bottom text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom'>Enrolled Classes</p>

    //     <Container className="mt-2">
    //       <ListGroup id="SearchClassSelection" variant="flush">
    //         {/* This is where ClassSearchItems are appended */}
    //         <ListGroup.Item>
    //           <Row className='classSearchItem align-items-center'>
    //             <Col xs={4}><p className="mt-1 mb-1">SENG 513</p></Col>
    //             <Col xs={7}></Col>
    //             <Col xs={1}>
    //               <ChevronRight className="mb-1" color="black" size={20} />
    //             </Col>
    //           </Row>
    //         </ListGroup.Item>
    //         <ListGroup.Item><ClassSearchItem courseName="all" /></ListGroup.Item>
    //       </ListGroup>
    //     </Container>

    //   </Container>
    // </> */}