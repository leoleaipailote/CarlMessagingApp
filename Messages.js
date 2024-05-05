const { timeStampGenerator } = require('./timeStampGenerator')
const getMessages = async (req, res, Messages) => {
    try{
        const latestMessages = await Messages.find().sort({createdAt: -1}).limit(5).toArray();
        res.status(202).send(latestMessages)
        console.log("successful GET")
    }
    catch(err){
        console.log(err);
    }
}

const postMessages = async (req, res, Messages) => {
    try{
        const {message} = req.body;
        const doc = {
            message: message,
            createdAt: timeStampGenerator()
        }
        await Messages.insertOne(doc)
        res.status(202).send(doc);
        console.log("successful post")
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { getMessages, postMessages }