const express = require("express");
const cors = require("cors")
const socketIO = require('socket.io')
const bodyParser = require("body-parser");

const authorization = require("./authorization.js")

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

app.post("/signup", authorization.signup)
app.post("/signin", authorization.signin);

const fakeDBChats = {
  'tim@ucalgary.ca': [
    {
      name: 'Simon',
      lastMessage: 'Hey man',
      unread: 0,
      id: 0,
    },
    {
      name: 'Luke',
      lastMessage: 'You done the project?',
      unread: 3,
      id: 1,
    },
    {
      name: 'Tim',
      lastMessage: 'Whats guuud',
      unread: 69,
      id: 2,
    }
  ]
}

const fakeDBRooms = {
  'Simon': { // this is a room
    messages: [
      {
        from: "simon.vincent@ucalgary.ca",
        contents: "Hello",
        time: "12:00",
        id: 1
      },
      {
        from: "tim@ucalgary.ca",
        contents: "How are you?",
        time: "12:01",
        id: 2
      },
    ]
  }
}

app.get("/chats", (req, res) => {
  const { email } = req.query;

  if (email in fakeDBChats) {
    res.status(200).send(fakeDBChats[email]);
  } else {
    res.status(404).send("No chats found");
  }
})

app.get("/messages", (req, res) => {
  const room = req.query.room

  if (fakeDBRooms[room]) {
    res.status(200).send(fakeDBRooms[room].messages)
  } else {
    res.status(404).send("Room not found")
  }
})

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});