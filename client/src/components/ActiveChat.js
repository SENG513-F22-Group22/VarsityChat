import React, { useState } from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    ButtonGroup,
    Form,
    Image,
    Badge,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const ActiveChat = (props) => {
    const { name, lastMessage, unread, room, setChats, socket } = props
    const navigate = useNavigate()
    const previewLength = 10
    const msgPreview = lastMessage.length > previewLength ? lastMessage.substring(0, previewLength) + '...' : lastMessage

    // Splits the room name to display the name of the other user
    let acName;
    const splitName1 = name.split(' ')[0]
    const splitName2 = name.split(' ')[1]
    if (splitName1 == localStorage.getItem('email')) {
        acName = splitName2
    } else {
        acName = splitName1
    }





    socket.on('chat room', (data) => {
        setChats(data.chats);
    });

    const handleClick = () => {
        navigate('/chatroom?name=' + room)
    }

    return (
        <>
            <Row className='activeChat border-top align-items-center' onClick={handleClick}>
                <Col xs={2}><Image src="default_prof.png" className="align-middle rounded-circle" width="50"></Image></Col>
                <Col xs={1}></Col>
                <Col xs={5}><p className="mb-0 pt-3 fw-bold">{acName}</p>
                    <p className="small fw-lighter text-muted">{msgPreview}</p></Col>
                <Col>
                    {unread > 0 && <Badge pill bg="primary">{unread}</Badge>}
                </Col>
                <Col xs={1}>
                    <ChevronRight color="black" size={20} />
                </Col>
            </Row>
        </>
    )
}

export default ActiveChat