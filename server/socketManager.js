module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("join", (room) => {
            socket.join(room);
            console.log("joined room: ", room);
        });

        socket.on("chat message", (data) => {
            io.to(data.room).emit("chat message", { room: data.room, messages: data.messages });
        });

        socket.on("chat room", (data) => {
            io.to(data.room).emit("chat room", { room: data.room, chats: data.chats });
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected")
        });
    });
}
