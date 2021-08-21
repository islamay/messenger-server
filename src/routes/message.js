const express = require('express')
const messageController = require('../controllers/message.controller')

const router = express.Router()

module.exports = (io) => {

    router.post('/send', messageController.sendMessage(io))

    return router
}