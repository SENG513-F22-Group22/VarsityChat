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


const fakeDBRooms = {
  Simon: { // this is a room
    messages: [
      {
        from: "Simon",
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


app.get("/messages", (req, res) => {
  const room = req.query.room
  res.send(fakeDBRooms[room].messages)
})

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});