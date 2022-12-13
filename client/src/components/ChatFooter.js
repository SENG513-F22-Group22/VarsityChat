import axios from "axios";
import React, { useEffect, useState } from "react";
import {} from "react-bootstrap";
import { Send } from "react-bootstrap-icons";

const ChatFooter = (props) => {
  const { socket, room, setMessages, userEmail } = props;
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages(data.messages);
    });
  }, [socket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/messages", {
        from: localStorage.getItem("email"),
        contents: message,
        time: new Date().toLocaleTimeString(),
        room: room,
        to: userEmail,
      });

      if (response.status === 200) {
        setMessage("");
        let newMessages = response.data.data.messages;
        setMessages(newMessages);
        socket.emit("chat message", { room: room, messages: newMessages });
        socket.emit("chat room", {
          room: room,
          chats: response.data.data.chats,
        });
      }
    } catch (error) {
      alert("Error! Message was not sent!");
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
        <button className="sendBtn" disabled={!message}>
          <Send color="white" size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
