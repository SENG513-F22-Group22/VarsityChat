import React, { useState, useEffect } from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  ButtonGroup,
  Form,
  Image,
  Badge,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import ActiveChat from '../components/ActiveChat';
import axios from 'axios';

const Chat = (props) => {
  const { socket, userEmail } = props
  const navigate = useNavigate()
  const [chats, setChats] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/chats',
      {
        params: {
          email: userEmail
        }
      })
      .then((res) => {
        setChats(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])


  if (!userEmail) {
    return (
      <>
        <h1>Not signed in</h1>
        <a href='/'>Sign in</a>
      </>
    )
  }


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
          {chats.map((chat) => (
            <ActiveChat
              name={chat.roomName}
              lastMessage={chat.lastmsg}
              unread={chat.unread}
              socket={socket}
              key={chat._id}
              room={chat._id}
            />
          ))}

        </Container>
      </Container>
    </>
  )
}

export default Chat