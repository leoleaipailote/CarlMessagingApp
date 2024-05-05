const { MongoClient } = require("mongodb");
require('dotenv').config(); // Adjust the path as necessary

let client;

const connectToDB = async () => {

    console.log("Connection Refreshed")
    client = new MongoClient(process.env.MONGODB_URI);

    await client.connect()
    console.log("successfully connected to DB")
    return client; 

}

const getClient = async () => {
    if (!client) {
        await connectToDB();
      }
      return client;
}

(async () => {
    await getClient()
})()


module.exports = {client}