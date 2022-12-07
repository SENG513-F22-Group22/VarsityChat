import React, { useState, useEffect } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Container,
  Form,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import ActiveChat from '../components/ActiveChat';
import axios from 'axios';

const Chat = ({ socket }) => {
  const [activeChats, setActiveChats] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('email')) {
      navigate('/')
      return;
    }

    axios.get("http://localhost:4000/chats",
      {
        params: {
          email: localStorage.getItem("email")
        }
      })
      .then((res) => {
        setActiveChats(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    // 'html' code goes here 
    <>
      <Container>

        <h2 className="text-start fw-bold mt-4 ms-3">Chat</h2>

        <Form className="d-flex mx-3">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>

        <p className='text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom'>Conversations</p>

        <Container id="chats-container">
          {/* Conversation "activeChat" objects are appended here. */}
          {activeChats.map((chat) => (
            <ActiveChat
              name={chat.name}
              lastMessage={chat.lastMessage}
              unread={chat.unread}
              id={chat.id}
              key={chat.id}
            />
          ))}

        </Container>
      </Container>
    </>
  )
}

export default Chat