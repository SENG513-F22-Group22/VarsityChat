"use strict";
import React, { useState, useEffect } from 'react'
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

    useEffect(() => {
        if (!localStorage.getItem('email')) {
            navigate('/')
            return;
        }

        // ensure we're only in one room at a time
        socket.disconnect()
        socket.connect()
        socket.emit('join', room)
        
    }, [room, socket])


    return (
        <>
            <ChatBody
                socket={socket}
            />
            <ChatFooter
                socket={socket}
                room={room}
            />
        </>
    )
}

export default ChatRoom