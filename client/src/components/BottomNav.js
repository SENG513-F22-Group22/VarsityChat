import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
    Button,
    Card,
    ButtonGroup,
    Container,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

export default function BottomNav() {
    const navigate = useNavigate()

    return (
        <Container>
            {/* Get rid of the border radius on the button group */}
            <ButtonGroup size="lg" className='fixed-bottom w-100'>
                <Button
                    disabled={window.location.href.split("/")[3] === "search" || !localStorage.getItem('email')}
                    variant={window.location.href.split("/")[3] === "search" ? "dark" : "light"}
                    onClick={() => navigate("/search")}
                    className="rounded-0"
                >Search
                </Button>
                <Button
                    disabled={window.location.href.split("/")[3] === "chat" || !localStorage.getItem('email')}
                    variant={window.location.href.split("/")[3] === "chat" ? "dark" : "light"}
                    onClick={() => navigate("/chat")}
                    className="rounded-0"
                >Chat
                </Button>
                <Button
                    disabled={window.location.href.split("/")[3] === "profile" || !localStorage.getItem('email')}
                    variant={window.location.href.split("/")[3] === "profile" ? "dark" : "light"}
                    onClick={() => navigate("/profile")}
                    className="rounded-0"
                >Profile
                </Button>
            </ButtonGroup >
        </Container >
    )
}