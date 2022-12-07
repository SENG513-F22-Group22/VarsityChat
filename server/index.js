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
  'tim@ucalgary.ca': [0, 1],
  'simon@ucalgary.ca': [0],
  'luke@ucalgary.ca': [1],
}

const fakeDBRooms = {
  0: { // this is a room id
    participants: ["simon@ucalgary.ca", "tim@ucalgary.ca"],
    messages: [
      {
        from: "simon.vincent@ucalgary.ca",
        contents: "Hello",
        time: "12:00",
        read: true,
        id: 1
      },
      {
        from: "tim@ucalgary.ca",
        contents: "How are you?",
        time: "12:01",
        read: false,
        id: 2
      },
    ],
  },
  1: {
    participants: ["luke@ucalgary.ca", "tim@ucalgary.ca"],
    messages: [
      {
        from: "luke@ucalgary.ca",
        contents: "Hey Tim",
        time: "12:00",
        read: true,
        id: 1
      },
      {
        from: "tim@ucalgary.ca",
        contents: "Hey Luke",
        time: "12:01",
        read: true,
        id: 2
      },
    ],
  }
}

app.get("/chats", (req, res) => {
  const { email } = req.query;

  if (email in fakeDBChats) {
    const chats = fakeDBChats[email].map((chatId) => {
      const chat = fakeDBRooms[chatId]
      const otherParticipant = chat.participants.filter((participant) => participant !== email)[0]
      const lastMessage = chat.messages[chat.messages.length - 1]
      return {
        name: otherParticipant,
        lastMessage: lastMessage.contents,
        unread: 1,
        id: chatId
      }
    })

    res.status(200).send(chats);
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