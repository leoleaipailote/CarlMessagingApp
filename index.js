const express = require('express');
const cors = require("cors");
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use(cors());
const {createServer} = require("http")
const httpServer = createServer(app);

const { client } = require('./dbSetup')
const { getMessages, postMessages } = require('./Messages')
const Messages = client.db("Messages")
const MessagesCollection = Messages.collection("Messages");
const { timeStampGenerator } = require('./timeStampGenerator')

const {Server} = require('socket.io')
const io = new Server(httpServer)


io.on("connection", (socket) => {
    console.log("socket connected with id: ", socket.id);
    socket.on("receiveMessage", async (data) => {
      console.log(data);
      const messageData = {
        message: data,
        createdAt: timeStampGenerator()
      }
      await MessagesCollection.insertOne(messageData);
      console.log("Successful post from socket")
      io.emit("getMessage", messageData)
      console.log("successful", + messageData)
    })
})

app.get('/api/v1/Messages/Messages/getMessages', async (req, res) => {
  console.log('GET /api/v1/messages/messages/getMessages')
  getMessages(req, res, MessagesCollection)
})

app.post('/api/v1/Messages/Messages/postMessages', async (req, res) => {
  console.log('POST /api/v1/messages/messages/postMessages')
  postMessages(req, res, MessagesCollection)
})

app.get('/', (req, res) => {
  res.send('Server is running');
});

httpServer.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`)
});