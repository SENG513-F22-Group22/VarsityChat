const { Message, Chatroom, User } = require("./database.js")

const getMessages = (req, res) => {
    const room = req.query.room 

    Message.find({ room: room }, (err, found) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        }
        else if (found) {
            res.send(found)
        }
        else {
            // TODO when no messages
        }
    })
}

const setMessages = (req, res) => {
    const from = req.body.from 
    const contents = req.body.contents 
    const time = req.body.time 
    const room = req.body.room

    const NewMessage = new Message({
        from: from,
        room: room,
        contents: contents,
        time: time,
    })

    NewMessage.save((err, saved) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        } else {
            
            Message.find({ room: room }, (err, found) => {
                if (err) {
                    res.status(500).json({ error: "Internal server error" })
                }
                else if (found) {
                    res.status(200).json({ message: "Message saved!", data: found })
                }
                else {
                    // TODO when no messages
                }
            })
            
        }
    })
}

const getRooms = (req, res) => {
    const email = req.query.email
    User.findOne({ email: email }, (err, foundUser) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        }
        else if (foundUser) {

            Chatroom.find({ users: foundUser.id }, (err, found) => {
                if (err) {
                    res.status(500).json({ error: "Internal server error" })
                }
                else if (found) {
                    res.send(found)
                }
                else {
                    // TODO: if chatroom was not found for user (means no chats started yet)
                }
            })
        }
        else {
            // TODO: if user was not found by email (but user should be logged in here so some kinda error)
        }
    })

    
}

// TODO start new room
const setRooms = () => {

}

const getUsers = (req, res) => {
    User.find((err, found) => {
        res.send(found)
    })
}

const checkRoom = (req, res) => {
    const { user1, user2 } = req.body
    Chatroom.findOne({ users: { $all: [user1, user2] } }, (err, found) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        }
        else if (found) {
            console.log(found)
            console.log("found")
            res.send(true)
        }
        else {
            setRooms()
            res.send(false)
        }
    })
}

module.exports = {
    getMessages,
    setMessages,
    getRooms,
    setRooms,
    getUsers,
    checkRoom
}