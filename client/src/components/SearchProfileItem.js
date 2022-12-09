import React, { useState } from 'react'
import {
    Row,
    Col,
    Image,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { ChatFill } from 'react-bootstrap-icons';

const SearchProfileItem = ({ name }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        // Need to make a new chatroom with this person

        // Not just go to an existing room, need to make a new room
        navigate('/chatroom?name=' + name)
    }

    return (
        <>
            <Row className='ms-1 searchProfileItem border-bottom align-items-center pb-2' onClick={handleClick}>

                <Col xs={2}><Image src="default_prof.png" className="align-middle rounded-circle" width="50"></Image></Col>
                <Col xs={1}></Col>
                <Col xs={5}><p className="mb-0 fw-bold">{name}</p></Col>
                <Col xs={2}></Col>

                <Col xs={1}>
                    <ChatFill color="grey" size={30} />
                </Col>
            </Row>
        </>
    )
}

export default SearchProfileItem