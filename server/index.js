const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const { log } = require("console");
const http = require('http').Server(app);
const PORT = 4000;
const { User } = require("./database.js")


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


app.post("/signup", (req, res) => {
  const { email, password } = req.body

  User.findOne({ email: email }, (err, found) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" })
    } else if (found) {
      res.status(400).json({ error: "Email already exists" })
    } else {

      const newUser = new User({
        email,
        password
      })

      newUser.save((err, saved) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" })
        } else {
          res.status(200).json({ message: "User created" })
        }
      })
    }
  });
})

app.post("/signin", (req, res) => {
  const { email, password } = req.body
  User.find({ email: email, password: password }, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else if (docs.length === 1) {
      res.status(200).json({ message: "User logged in" })
    }
    else {
      res.status(401).json({ error: "Invalid credentials" })
    }
  })

});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});