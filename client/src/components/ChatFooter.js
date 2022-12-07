import React, { useState } from 'react';
import { Send } from 'react-bootstrap-icons';
import {

} from 'react-bootstrap';

const ChatFooter = ({ socket, room }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
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
        setMessage('');
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
                <button className="sendBtn"
                    disabled={!message}
                >
                    <Send color="white" size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatFooter;