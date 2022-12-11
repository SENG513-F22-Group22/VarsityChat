import React, { useState, useEffect } from 'react';
import {
    Button,
    Row,
    Col,
    Image,
} from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom"
import Message from './Message';
import axios from 'axios';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

const ChatBody = (props) => {
    const { socket, messages, setMessages } = props
    const navigate = useNavigate();



    useEffect(() => {
        axios.get('http://localhost:4000/messages',
            {
                params: {
                    room: window.location.href.split('?')[1].split('=')[1],

                }
            })
            .then((res) => {
                setMessages(res.data);
                const chatBody = document.querySelector('.message__container');
                setTimeout(() => {
                    chatBody.scrollTo({
                        top: chatBody.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 100);
            }).catch((err) => {
                console.log(err);
            })
    }, [])


    socket.on('chat message', (data) => {
        setMessages(data.messages);
        // scroll to bottom of chat
        const chatBody = document.querySelector('.message__container');
        setTimeout(() => {
            chatBody.scrollTo({
                top: chatBody.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    });

    const handleLeaveChat = () => {
        navigate('/chat');
    };

    return (
        <>
            <Row>
                <header className="chat__mainHeader">
                    <Col xs={2} lg={2}>
                        <Button className="ms-2" variant="outline-secondary" onClick={() => navigate("/search")}>
                            <ArrowLeft color="black" size={20} />
                        </Button>
                    </Col>
                    <Col xs={2} lg={2}>
                        <Image src="default_prof.png" className="align-middle rounded-circle" width="50"></Image>
                    </Col>
                    <Col xs={1} lg={1}>
                        <p className='mt-3 fw-bold'>"Name"</p>
                    </Col>
                    <Col xs={5} lg={5}></Col>
                    <Col xs={1} lg={1}><ThreeDotsVertical size={20} color="grey"></ThreeDotsVertical></Col>
                </header>
            </Row>
            <div className="message__container">
                {messages.map((message) => (
                    <Message
                        from={message.from}
                        contents={message.contents}
                        time={message.time}
                        key={message._id}
                    />
                ))}

                {/*This is triggered when a user is typing*/}
                <div className="message__status">
                    {/* <p>Someone is typing...</p> */}
                </div>
            </div>
        </>
    );
};

export default ChatBody;