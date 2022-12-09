const express = require("express");
const cors = require("cors")
const socketIO = require('socket.io')
const bodyParser = require("body-parser");

const authorization = require("./authorization.js")
const chats = require("./chats.js")

const app = express();
const http = require('http').Server(app);

const serverSocket = socketIO(http, {
  cors: {
    origins: ["http://localhost:3000", "http://127.0.0.1:3000"],
  }
});
require("./socketManager.js")(serverSocket);

const PORT = 4000;

app.use(cors())
app.use(bodyParser.json())

app.post("/signup", authorization.signup);
app.post("/signin", authorization.signin);

app.get("/chats", chats.getRooms);

app.get("/checkRoom", chats.checkRoom)

app.get("/users", chats.getUsers);

app.get("/messages", chats.getMessages);
app.post("/messages", chats.setMessages);


http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});