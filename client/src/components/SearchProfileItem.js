import React, { useState } from 'react'
import { Comment } from 'react-bootstrap-icons';
import {
    Row,
    Col,
    Image,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { Comment } from 'react-bootstrap-icons';

const SearchProfileItem = ({ name }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        // Need to make a new chatroom with this person
        navigate('/chatroom?name=' + name)
    }

    return (
        <>
            <Row className='searchProfileItem border-bottom align-items-center' onClick={handleClick}>
                <Col xs={2}><Image src="default_prof.png" className="align-middle rounded-circle" width="50"></Image></Col>
                <Col xs={1}></Col>
                <Col xs={5}><p className="mb-0 pt-3 fw-bold">{name}</p>
                    <Comment color="black" size={20} />
                </Col>
            </Row>
        </>
    )
}

export default SearchProfileItem