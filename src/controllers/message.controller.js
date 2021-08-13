const MessageModel = require('../models/message')

const sendMessage = async (req, res) => {
    const { message, roomId, interlocutorId } = req.body
    const { _id: userId } = req.body.middleware.user

    try {
        const sent = await MessageModel.sendMessage({ message, roomId, interlocutorId, userId })
        console.log(sent);
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
    }

}

module.exports.sendMessage = sendMessage