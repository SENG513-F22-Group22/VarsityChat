import React from 'react';
import {

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Message from './Message';

const ChatBody = () => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        navigate('/chat');
    };

    const messages = [
        {
            from: 'John',
            contents: 'Hello there',
            time: '12:00 PM',
            isSelf: false,
        },
        {
            from: 'You',
            contents: 'How are you?',
            time: '12:01 PM',
            isSelf: true,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
        },
        {
            from: 'John',
            contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            time: '12:02 PM',
            isSelf: false,
        },
        {
            from: 'You',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
        },
        {
            from: 'John',
            contents: 'What about you?',
            time: '12:03 PM',
            isSelf: false,
        }
    ];

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