import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./pages/Chat"
import ChatRoom from "./pages/ChatRoom"
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import BottomNav from './components/BottomNav';

import socketIO from "socket.io-client"
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = socketIO.connect("http://localhost:4000")

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Add pages here */}
        <Routes>
          <Route path="/chat" element={<Chat socket={socket} />}></Route>
          <Route path="/chatroom" element={<ChatRoom socket={socket} />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/searchresults" element={<SearchResults />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>

  );
}

export default App;
