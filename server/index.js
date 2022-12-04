const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const { log } = require("console");
const http = require('http').Server(app);
const PORT = 4000;
const { User } = require("./database.js")
const authorization = require("./authorization.js")


const socketIO = require('socket.io')(http, {
  cors: {
    origins: ["http://localhost:3000", "http://127.0.0.1:3000"],
  }
});

app.use(cors())
app.use(bodyParser.json())
let users = []

socketIO.on('connection', (socket) => {

  socket.on("chat message", data => {
    console.log(data);
    // socketIO.emit("messageResponse", data)
  })

  socket.on("join", room => {
    console.log(room);
    socket.join(room)
  })

  socket.on("typing", data => (
    socket.broadcast.emit("typingResponse", data)
  ))

  socket.on("newUser", data => {
    users.push(data)
    socketIO.emit("newUserResponse", users)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id)
    socketIO.emit("newUserResponse", users)
    socket.disconnect()
  });
});

app.post("/signup", authorization.signup)
app.post("/signin", authorization.signin);

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});