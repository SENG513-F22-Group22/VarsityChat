const express = require("express");
const cors = require("cors")
const socketIO = require('socket.io')
const bodyParser = require("body-parser");

const authorization = require("./authorization.js")
const chats = require("./chats.js")
const course = require("./course.js")
const profile = require("./profile.js")

const app = express();
const http = require('http').Server(app);

const serverSocket = socketIO(http, {
  cors: {
    origins: ["http://localhost:3000", "http://127.0.0.1:3000"],
  }
});
require("./socketManager.js")(serverSocket);

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", authorization.signup);
app.post("/signin", authorization.signin);

app.get("/chats", chats.getRooms);
app.get("/getRoom", chats.getRoom);

app.get("/users", chats.getUsers);

app.get("/messages", chats.getMessages);
app.post("/messages", chats.setMessages);
app.post("/zeroUnread", chats.zeroUnreadMsgs);

app.get("/classes", chats.getClasses);
app.get("/getRecv", chats.getRecipient)

app.get("/profileName", profile.getNames);
app.post("/profileName", profile.setNames);

// this is for the new Courses entry created for the database
// it has the master list of all classes
app.get("/courses", course.getAllCourses);
app.post("/courses", course.addCourse);

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});