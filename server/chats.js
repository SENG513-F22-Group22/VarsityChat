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
    const to = req.body.to

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

                    Chatroom.findOne({ _id: room }, (err, foundChatroom) => {
                        if (err) {
                            res.status(500).json({ error: "Internal server error" })
                        }
                        else if (foundChatroom) {
                            const newFound = foundChatroom
                            const temp = found.slice()
                            newFound.lastmsg = temp.pop().contents
                            const temp2 = newFound.lastmsg
                            newFound.save((err) => {
                                if (err) {
                                    console.log(err)
                                }
                                res.status(200).json({ message: "Message saved!", data: { messages: found, chats: newFound } })
                            })

                        }

                    })
                }
                else {
                    // TODO when no messages, prolly just return nothing
                }
            })

        }
    })
}

const getRooms = (req, res) => {
    const email = req.query.email
    Chatroom.find({ users: email }, (err, found) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        }
        if (found) {
            res.send(found)
        }
        else {
            // TODO: if user was not found by email (but user should be logged in here so some kinda error)
        }
    })


}


const getUsers = (req, res) => {
    const { course } = req.query

    User.find((err, found) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        }
        else if (found) {
            res.status(200).json({ users: found })
        }
        else {
            res.status(404).json({ error: "User not found" })
        }
    })
}

const getRoom = (req, res) => {
    let { user1, user2 } = req.query

    Chatroom.findOne({ users: { $all: [user1, user2] } }, (err, found) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        }
        else if (found) {
            res.status(200).json({ newRoomID: found.id })
        }
        else {
            const NewChatroom = new Chatroom({
                roomName: user1 + " " + user2,
                users: [user1, user2],
                unread: 0,
                lastmsg: "yo"
            })

            NewChatroom.save((err) => {
                if (err) {
                    console.log(err)
                }
            })
            res.status(201).json({ newRoomID: NewChatroom.id })
        }
    })
}

const getClasses = (req, res) => {
    const email = req.query.email

    console.log(`Looking for classes of ${email}`);

    User.findOne({ email: email }, (err, found) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        }
        else if (found) {
            res.status(200).json({ classes: found.classes })
        }
        else {
            res.status(404).json({ error: "User not found" })
        }
    })
}

module.exports = {
    getMessages,
    setMessages,
    getRooms,
    getRoom,
    getUsers,
    getClasses
}