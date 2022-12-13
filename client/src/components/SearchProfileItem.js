import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ChatFill } from "react-bootstrap-icons";
import axios from "axios";

const SearchProfileItem = (props) => {
  const { email, userEmail } = props;
  const navigate = useNavigate();

  const handleClick = async () => {
    let newRoomID = "";

    try {
      const response = await axios.get("http://localhost:4000/getRoom", {
        params: {
          user1: email,
          user2: userEmail,
        },
      });

      if (response.status === 200) {
        newRoomID = response.data.newRoomID;
      } else if (response.status === 201) {
        newRoomID = response.data.newRoomID;
      }
    } catch (error) {
      console.log(error);
      alert("Error! Message was not sent!");
    }
    // Need to make a new chatroom with this person

    // Not just go to an existing room, need to make a new room
    navigate("/chatroom?name=" + newRoomID);
  };

  return (
    <>
      <Row
        className="ms-1 searchProfileItem border-bottom align-items-center pb-2"
        onClick={handleClick}
      >
        <Col xs={2}>
          <Image
            src="default_prof.png"
            className="align-middle rounded-circle"
            width="50"
          ></Image>
        </Col>
        <Col xs={1}></Col>
        <Col xs={5}>
          <p className="mb-0 fw-bold">{email}</p>
        </Col>
        <Col xs={2}></Col>

        <Col xs={1}>
          <ChatFill color="grey" size={30} />
        </Col>
      </Row>
    </>
  );
};

export default SearchProfileItem;
