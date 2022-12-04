const connection = (socket) => {
    console.log("New client connected");
    // Here we can listen to events from the client
    socket.on("message", (message) => {
        console.log(message);
        // Here we can emit events to the client
        socket.emit("message", "Hello from the server");
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
}

module.exports = {
    connection
}