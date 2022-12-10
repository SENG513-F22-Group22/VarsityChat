import React, { useState, useEffect } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
    Container,
    Row,
    Col,
    Form,
    ListGroup,
    Button
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import SearchProfileItem from '../components/SearchProfileItem';
import { ArrowLeft } from 'react-bootstrap-icons';
import { ChatFill } from 'react-bootstrap-icons';
import { Image } from 'react-bootstrap-icons';
import axios from 'axios'


const SearchResults = (props) => {
    const { socket, userEmail } = props
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/users',
          ).then((res) => {
            
            // remove current user from list
            let validUsers = []
            for (let user of res.data) {
                if (user.email !== userEmail) {
                    validUsers.push(user)
                }
            }
    
        
            setUsers(validUsers)
          }).catch((err) => {
            console.log(err);
          })
      }, [])

    const navigate = useNavigate()
    return (
        // 'html' code goes here 
      
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
                        <Form className="d-flex mx-3">
                            <Form.Control
                                type="search"
                                placeholder="Filter by name"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                    </Col>
                    <Col xs={0} lg={3}></Col>
                </Row>
                <Row className="mt-2 ms-1">
                    <Col xs={0} lg={3}></Col>
                    <Col xs={4} lg={6}>
                        <Button variant="outline-secondary" onClick={() => navigate("/search")}>
                            <ArrowLeft color="black" size={20} />
                        </Button>
                    </Col>
                    <Col xs={0} lg={6}></Col>
                </Row>

                <Row>
                    <Col xs={0} lg={3}></Col>
                    <Col lg={6}>
                        <p className='border-bottom text-black-50 text-start ms-3 mt-2 mb-2 negative-margin-bottom'>Course Name</p>
                    </Col>
                    <Col xs={0} lg={3}></Col>
                </Row>

                <Row>
                    <Col xs={0} lg={3}></Col>
                    <Col lg={6}>
                <Container id="SearchResultsContainer" >
                    {/* This is where SearchProfileItems are appended */}
                    {users.map((user) => (
                        <SearchProfileItem userEmail={userEmail} email={user.email} key={user._id} />
                    ))}
                     </Container>
                    </Col>
                    <Col xs={0} lg={3}></Col>
                </Row>
                </Container>
    )
}

export default SearchResults