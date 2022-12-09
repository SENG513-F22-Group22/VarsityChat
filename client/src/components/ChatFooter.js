import React, { useState } from 'react';
import { Send } from 'react-bootstrap-icons';
import {

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const ChatFooter = (props) => {
    const { socket, room, setMessages } = props
    const [message, setMessage] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('http://localhost:4000/messages', {
                from: localStorage.getItem('email'),
                contents: message,
                time: new Date().toLocaleTimeString(),
                room: room
            })
      
            if (response.status === 200) {
                setMessages(response.data.data)
                socket.emit('chat message', response.data.data)
            }
          } catch (error) {
            alert("Error! Message was not sent!")
          }

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