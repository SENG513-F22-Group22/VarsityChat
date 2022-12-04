import React, { useState } from 'react'
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

const Chat = ({ socket }) => {
  const navigate = useNavigate()

  if (!localStorage.getItem('email')) {
    return (
      <>
        <h1>Not signed in</h1>
      </>
    )
  }


  // This is a placeholder for the chat list
  const activeChats = [
    {
      name: 'Simon',
      lastMessage: 'Hey man',
      unread: 0,
      id: 0,
    },
    {
      name: 'Luke',
      lastMessage: 'You done the project?',
      unread: 1,
      id: 1,
    },
    {
      name: 'Tim',
      lastMessage: 'Whats guuud',
      unread: 69,
      id: 2,
    }
  ]

  return (
    // 'html' code goes here 
    <>
      <Container>

        <h1 className="text-start fw-bold mt-4 ms-3">Chat</h1>

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
              socket={socket}
              key={chat.id}
            />
          ))}

        </Container>
      </Container>
    </>
  )
}

export default Chat