const express = require('express');
const cors = require("cors");
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use(cors({
  origin: 'https://7fbd-149-43-203-109.ngrok-free.app' // Replace with your actual React app's ngrok URL
}));
const {createServer} = require("http")
const httpServer = createServer(app);

const {Server} = require('socket.io')
const io = new Server(httpServer)


io.on("connection", (socket) => {
    console.log("socket connected with id: ", socket.id);
    socket.on("receiveMessage", (data) => {
      console.log(data);
    })
})

app.get('/', (req, res) => {
  res.send('Server is running');
});

httpServer.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`)
});