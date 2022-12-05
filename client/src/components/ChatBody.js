import React, { useState } from 'react';
import {

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Message from './Message';

const ChatBody = ({ socket }) => {
    const navigate = useNavigate();
    
    const exampleMessages = [
        {
            from: 'Simon',
            contents: 'hey man how are you',
            time: '12:00',
            isSelf: false,
            id: 0
        },
    ]

    const [messages, setMessages] = useState(exampleMessages);

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
                        isSelf={message.isSelf}
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