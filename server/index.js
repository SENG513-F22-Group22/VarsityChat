const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser");
const { log } = require("console");
const http = require('http').Server(app);
const PORT = 4000
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


const fakeDB = {
  users: [
    {
      email: "tim@ucalgary.ca",
      password: "password"
    },
  ]
}

app.get("/api", (req, res) => {
  res.json({ message: "Hello" })
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body
  const user = fakeDB.users.find(user => user.email === email)
  
  if (user) {
    res.status(400).json({ message: "User already exists" })
  } else {
    fakeDB.users.push({
      email,
      password
    })
    res.status(200).json({ message: "User created" })
  }
})

app.post("/signin", (req, res) => {
  const { email, password } = req.body
  const user = fakeDB.users.find(user => user.email === email && user.password === password)

  if (user) {
    res.status(200).json({ message: "User logged in" })
  } else {
    res.status(401).json({ error: "Invalid credentials" })
  }
});



http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});