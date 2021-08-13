const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    to: {
        type: mongoose.Types.ObjectId
    },
    toRoom: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
})

MessageSchema.statics.sendMessage = async function (param) {
    const MessageModel = this

    try {
        const message = new MessageModel({
            message: param.message,
            sender: param.userId,
            to: param.interlocutorId,
            toRoom: param.roomId
        })

        await message.save()

        return true
    } catch (error) {
        return error
    }
}


const MessageModel = mongoose.model('message', MessageSchema)

module.exports = MessageModel