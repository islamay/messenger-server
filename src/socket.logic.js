


const onConnectionLogic = socket => {
    socket.on('joinRooms', roomIds => {
        socket.join(roomIds)
    })
}

module.exports.onConnectionLogic = onConnectionLogic