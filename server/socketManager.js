module.exports = (io) => {
    io.on("connection", (socket) => {

        socket.on("join", (room) => {
            socket.join(room);
            console.log("joined room: ", room);
        });

        socket.on("chat message", (message) => {
            io.to(message.room).emit("chat message", message);
        });
    });
}
