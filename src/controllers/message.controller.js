const MessageModel = require('../models/message')

const sendMessage = async (req, res) => {
    const { message, roomId, interlocutorId } = req.body
    const { _id: userId } = req.body.middleware.user

    try {
        const resultMessage = await MessageModel.sendMessage({ message, roomId, interlocutorId, userId })
        res.json(resultMessage)
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }

}

module.exports.sendMessage = sendMessage