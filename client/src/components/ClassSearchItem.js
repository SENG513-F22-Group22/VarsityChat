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
            <Row className='classSearchItem align-items-center' onClick={handleClick}>
                <Col xs={4}><p className="mb-1 mt-1">{courseName}</p></Col>
                <Col xs={7}></Col>
                <Col xs={1}>
                    <ChevronRight className="mb-1" color="black" size={20} />
                </Col>
            </Row>
        </>
    )
}

export default ClassSearchItem;