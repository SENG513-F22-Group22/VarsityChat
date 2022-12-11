import React, { useState } from 'react'
// Import components here from https://react-bootstrap.github.io/layout/grid/
import {
    Button,
    Card,
    ButtonGroup,
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

export default function BottomNav() {
    const navigate = useNavigate()

    return (

        <Card className="bottomNav fixed-bottom" variant="bottom">
            <ButtonGroup size="lg">
                <Button disabled={window.location.href.split("/")[3] === "search"} variant={window.location.href.split("/")[3] === "search" ? "dark" : "light"} onClick={() => navigate("/search")} >Search</Button>
                <Button disabled={window.location.href.split("/")[3] === "chat"} variant={window.location.href.split("/")[3] === "chat" ? "dark" : "light"} onClick={() => navigate("/chat")} >Chat</Button>
                <Button disabled={window.location.href.split("/")[3] === "profile"} variant={window.location.href.split("/")[3] === "profile" ? "dark" : "light"} onClick={() => navigate("/profile")} >Profile</Button>
            </ButtonGroup>
        </Card>
    )
}