import React, { useEffect, useState } from "react";
// Import components here from https://react-bootstrap.github.io/layout/grid/
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ActiveChat from "../components/ActiveChat";

const Chat = (props) => {
  const { socket, userEmail } = props;
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:4000/chats", {
        params: {
          email: userEmail,
        },
      })
      .then((res) => {
        setChats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!userEmail) {
    return (
      <>
        <h1>Not signed in</h1>
        <a href="/">Sign in</a>
      </>
    );
  }

  return (
    // 'html' code goes here
    <>
      <Container>
        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <h2 className="text-start fw-bold mt-4 ms-3">Chat</h2>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>
        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            {/* <Form className="d-flex mx-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form> */}
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>

        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <p className="text-black-50 text-start ms-2 mt-2 mb-2 negative-margin-bottom">
              Conversations
            </p>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>

        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={6}>
            <Container id="chats-container">
              {/* Conversation "activeChat" objects are appended here. */}
              {loading ? (
                <h1>Loading...</h1>
              ) : chats.length === 0 ? (
                <p>No chats</p>
              ) : (
                chats.map((chat) => (
                  <ActiveChat
                    name={chat.roomName}
                    lastMessage={chat.lastmsg}
                    unread={chat.unread[chat.users[0] === userEmail ? 0 : 1]}
                    socket={socket}
                    key={chat._id}
                    room={chat._id}
                    userEmail={userEmail}
                    setChats={setChats}
                  />
                ))
              )}
            </Container>
          </Col>
          <Col xs={0} lg={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Chat;
