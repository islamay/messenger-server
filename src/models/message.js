const mongoose = require('mongoose')
const moment = require('moment')

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
        default: moment()
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

        return message
    } catch (error) {
        return error
    }
}


const MessageModel = mongoose.model('message', MessageSchema)

module.exports = MessageModel