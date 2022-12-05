module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("join", (room) => {
            socket.join(room);
            console.log("joined room: ", room);
        });

        socket.on("chat message", (message) => {
            console.log("message: ", message);
            // io.to(message.room).emit("chat message", message);
            io.emit("chat message", message);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected")
        });
    });
}
