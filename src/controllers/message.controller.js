const MessageModel = require('../models/message')

module.exports.sendMessage = (io) => {

    return async (req, res) => {
        const { message, roomId, interlocutorId } = req.body
        const { _id: userId } = req.body.middleware.user

        try {
            const resultMessage = await MessageModel.sendMessage({ message, roomId, interlocutorId, userId })
            res.json(resultMessage)
            // resultMessage.toRoom type suprisingly object type
            io.to(String(resultMessage.toRoom)).emit('newMessage', resultMessage)
        } catch (error) {
            console.log(error);
            res.sendStatus(400)
        }
    }


}

