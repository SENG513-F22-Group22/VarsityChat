const mongoose = require("mongoose");
const CONNECTION_URL = 'mongodb+srv://SENG513PROJ:oRAMdvj4wDQLlLc7@cluster0.fviwa49.mongodb.net/SENGDB?retryWrites=true&w=majority';

// schema for user data
const User = mongoose.model('User', {
    email: { type: String },
    password: { type: String }
});

mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log("Connected to database")

    })
    .catch((error) => console.log(error.message));

module.exports = {
    User
}