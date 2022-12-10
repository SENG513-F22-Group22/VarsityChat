import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
    Button,
    Card,
    Container,
    Row,
    ButtonGroup,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

export default function BottomNav() {
    const navigate = useNavigate()

    return (
        <Card className="fixed-bottom" variant="bottom">
            {/* Get rid of the border radius on the button group */}
            <ButtonGroup size="lg" className='w-100'>
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
        </Card >
    )
}