require('dotenv').config();
const mongoose = require("mongoose");
const CONNECTION_URL = `mongodb+srv://SENG513PROJ:${process.env.MONGO_PW}@cluster0.fviwa49.mongodb.net/SENGDB?retryWrites=true&w=majority`;

// schema for user data
const User = mongoose.model('User', {
    email: { type: String },
    password: { type: String },
    courses: [{ type: String }],
    firstName: { type: String },
    lastName: { type: String },
});

// schema for chat room data
const Chatroom = mongoose.model('Chatroom', {
    roomName: { type: String },
    users: [{ type: String }],
    unread: [{ type: Number }],
    lastmsg: { type: String }
});

// schema for message room data
const Message = mongoose.model('Message', {
    from: { type: String },
    room: { type: String },
    contents: { type: String },
    time: { type: String },
    id: { type: Number }
});

const Course = mongoose.model('Course', {
    courseName: { type: String },
});

mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log("Connected to database")

    })
    .catch((error) => console.log(error.message));

module.exports = {
    User,
    Message,
    Chatroom,
    Course
}