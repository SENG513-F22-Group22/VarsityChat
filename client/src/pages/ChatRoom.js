"use strict";
import React, { useState, useEffect } from "react";
import { ChevronRight } from "react-bootstrap-icons";
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

const ChatRoom = (props) => {
  const { socket, userEmail } = props;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const room = window.location.href.split("?")[1].split("=")[1];

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/");
      return;
    }

    // ensure we're only in one room at a time
    socket.disconnect();
    socket.connect();
    socket.emit("join", room);

    axios
      .get("http://localhost:4000/messages", {
        params: {
          room: room,
        },
      })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [room, socket]);

  return (
    <>
      <ChatBody
        socket={socket}
        messages={messages}
        setMessages={setMessages}
        userEmail={userEmail}
      />
      <ChatFooter
        socket={socket}
        room={room}
        setMessages={setMessages}
        userEmail={userEmail}
      />
    </>
  );
};

export default ChatRoom;
