import express from 'express'
const app = express()
const PORT = 5000

// const http = require('http').Server(app)
// const cors = require('cors')
// app.use(cors())

// const io = require('socket.io')(http, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// })



app.get('/api', (req, res) => {
    res.send('<h1>Hello, World!</h1>')
})

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`app listening on port ${PORT}`);
})