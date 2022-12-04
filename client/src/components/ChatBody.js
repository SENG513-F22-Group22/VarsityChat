import React from 'react';
import {

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Message from './Message';

const ChatBody = ({ socket }) => {
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
            id: 0,
        },
        {
            from: 'You',
            contents: 'How are you?',
            time: '12:01 PM',
            isSelf: true,
            id: 1,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
            id: 2,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
            id: 3,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
            id: 4,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
            id: 5,
        },
        {
            from: 'John',
            contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            time: '12:02 PM',
            isSelf: false,
            id: 6,
        },
        {
            from: 'You',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
            id: 7,
        },
        {
            from: 'John',
            contents: 'I am fine',
            time: '12:02 PM',
            isSelf: false,
            id: 8,
        },
        {
            from: 'John',
            contents: 'What about you?',
            time: '12:03 PM',
            isSelf: false,
            id: 9,
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