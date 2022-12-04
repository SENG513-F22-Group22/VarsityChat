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

    return (
        // 'html' code goes here 
        <>
            <ChatBody />
            <ChatFooter />

        </>
    )
}

export default ChatRoom