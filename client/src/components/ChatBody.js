import React, { useState, useEffect } from 'react';
import {
    Button
} from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom"
import Message from './Message';
import axios from 'axios';

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
            <header className="chat__mainHeader">
                <Button variant="outline-secondary" onClick={() => navigate("/search")}>
                    <ArrowLeft color="black" size={20} />
                </Button>
                <p>Profile Pic and Name and last seen
                </p>
            </header>

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