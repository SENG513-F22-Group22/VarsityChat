import React, { useState } from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
import {
    Row,
    Col,

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const ClassSearchItem = ({ courseName }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/searchresults?name=' + courseName)
    }

    return (
        <>
            <Row className='classSearchItem mb-3 border-bottom align-items-center' onClick={handleClick}>
                <Col xs={4}><p className="">{courseName}</p></Col>
                <Col xs={7}></Col>
                <Col xs={1}>
                    <ChevronRight className="mb-3" color="black" size={20} />
                </Col>
            </Row>
        </>
    )
}

export default ClassSearchItem;