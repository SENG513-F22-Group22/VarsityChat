import React from "react";
// Import components here from https://react-bootstrap.github.io/layout/grid/
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();

  const location = window.location.href.split("/")[3].split("?")[0];

  return (
    <ButtonGroup
      size="lg"
      // give it a top border
      className="fixed-bottom w-100 border-top border-dark"
      style={{ height: "10vh" }}
    >
      <Button
        variant={
          location === "search" || location === "searchresults"
            ? "dark"
            : "light"
        }
        onClick={() => navigate("/search")}
        className="rounded-0"
      >
        Search
      </Button>
      <Button
        variant={
          location === "chat" || location === "chatroom" ? "dark" : "light"
        }
        onClick={() => navigate("/chat")}
        className="rounded-0"
      >
        Chat
      </Button>
      <Button
        variant={location === "profile" ? "dark" : "light"}
        onClick={() => navigate("/profile")}
        className="rounded-0"
      >
        Profile
      </Button>
    </ButtonGroup>
  );
}
