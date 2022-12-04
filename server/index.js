const express = require("express");
const cors = require("cors")
const socketIO = require('socket.io')
const bodyParser = require("body-parser");

const authorization = require("./authorization.js")
const socketManager = require("./socketManager.js")

const app = express();
const http = require('http').Server(app);

const PORT = 4000;

const serverSocket = socketIO(http, {
  cors: {
    origins: ["http://localhost:3000", "http://127.0.0.1:3000"],
  }
});
serverSocket.on('connection', socketManager.connection)

app.use(cors())
app.use(bodyParser.json())

app.post("/signup", authorization.signup)
app.post("/signin", authorization.signin);

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});