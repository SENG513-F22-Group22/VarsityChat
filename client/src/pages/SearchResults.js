import React, { useState } from 'react'
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


const SearchResults = ({ socket }) => {
    const navigate = useNavigate()
    return (
        // 'html' code goes here 
        <>
            <Container>
                <Row>
                    <h2 className="text-start fw-bold mt-4 ms-3">Search</h2>
                </Row>
                <Row>
                    <Form className="d-flex mx-3">
                        <Form.Control
                            type="search"
                            placeholder="Filter by name"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                </Row>
                <Row className="mt-2 ms-1">
                    <Col xs={4}>
                        <Button variant="outline-secondary">
                            <ArrowLeft color="black" size={20} />
                        </Button>
                    </Col>
                </Row>

                <p className='border-bottom text-black-50 text-start ms-3 mt-2 mb-2 negative-margin-bottom'>Course Name</p>

                <Container id="SearchResultsContainer" >
                    {/* This is where SearchProfileItems are appended */}
                    <SearchProfileItem name="Tim Macphail" />
                </Container>



            </Container>
        </>
    )
}

export default SearchResults