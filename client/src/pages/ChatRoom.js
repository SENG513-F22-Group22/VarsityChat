"use strict";
import React, { useState } from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {

} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';

const ChatRoom = ({ socket }) => {
    const navigate = useNavigate()

    const room = window.location.href.split('?')[1].split('=')[1]
    socket.emit('join', room)

    return (
        // 'html' code goes here 
        <>
            <ChatBody
                socket={socket}
            />
            <ChatFooter
                socket={socket}
            />

        </>
    )
}

export default ChatRoom