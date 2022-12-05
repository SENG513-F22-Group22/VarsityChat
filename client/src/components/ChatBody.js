import React, { useState, useEffect } from 'react';
import {

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Message from './Message';
import axios from 'axios';

const ChatBody = ({ socket }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/messages',
            {
                params: {
                    room: window.location.href.split('?')[1].split('=')[1]
                }
            })
            .then((res) => {
                setMessages(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [])


    socket.on('chat message', (message) => {
        setMessages([...messages, message]);
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