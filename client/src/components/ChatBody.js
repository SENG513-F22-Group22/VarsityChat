import React, { useState, useEffect, useRef } from 'react';
import {

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Message from './Message';
import axios from 'axios';

const ChatBody = ({ socket }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:4000/messages',
            {
                params: {
                    room: window.location.href.split('?')[1].split('=')[1],
                    email: localStorage.getItem('email')
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    setMessages(res.data);

                }
            }).catch((err) => {
                console.log(err);
                if (err.response.status === 403) {
                    alert("Unauthorized")
                    navigate('/chat');
                }
            })
    }, [])


    socket.on('chat message', (message) => {
        setMessages([...messages, message]);
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
                <p>Profile Pic and Name and last seen
                </p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>

            <div className="message__container">
                {messages.map((message) => (
                    <Message
                        from={message.from}
                        contents={message.contents}
                        time={message.time}
                        key={message.id}
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