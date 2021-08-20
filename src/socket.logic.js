


const onConnectionLogic = socket => {

    socket.on('join', roomId => {

        socket.join(roomId)
    })

    console.log('Hi');
}

module.exports.onConnectionLogic = onConnectionLogic