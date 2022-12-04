const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const { log } = require("console");
const http = require('http').Server(app);
const mongoose = require("mongoose");
const PORT = 4000;
const CONNECTION_URL = 'mongodb+srv://SENG513PROJ:oRAMdvj4wDQLlLc7@cluster0.fviwa49.mongodb.net/SENGDB?retryWrites=true&w=majority';

// schema for user data
const User = mongoose.model('User', {
  email: { type: String },
  password: { type: String }
});

const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors())
app.use(bodyParser.json())
let users = []

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)
  socket.on("message", data => {
    socketIO.emit("messageResponse", data)
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

app.get("/api", (req, res) => {

  res.json({ message: "Hello" })
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

mongoose.connect(CONNECTION_URL)
  .then(() => {
    console.log("Connected to database")
    http.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));