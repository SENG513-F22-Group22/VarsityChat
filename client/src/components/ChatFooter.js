import React, { useState } from 'react';
import { Send } from 'react-bootstrap-icons';
import {

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const ChatFooter = ({ socket, room }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log({ userName: localStorage.getItem('email'), message });
        setMessage('');
        socket.emit('chat message',
            {
                from: localStorage.getItem('email'),
                contents: message,
                time: new Date().toLocaleTimeString(),
                isSelf: false,
                id: Math.random(),
                room: room
            },
        );
    };
    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="sendBtn">
                    <Send color="white" size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatFooter;