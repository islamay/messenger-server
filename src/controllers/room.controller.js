const PrivateRoomModel = require("../models/privateRoom.model");
const UserModel = require('../models/user.model')
const checkUser = require("../helpers/checkUser");

const getRoom = async (req, res) => {
  const { roomId } = req.body
  const { _id: userId } = req.body.middleware.user

  try {
    const room = await PrivateRoomModel.findByIdAndGetDetail(roomId, userId)
    res.send(room)
  } catch (error) {
    res.send(error)
  }
}

module.exports.getRoom = getRoom

const createPrivateRoom = async (req, res) => {
  const { interlocutorUsername } = req.body;
  const { _id: userId } = req.body.middleware.user;

  
  let interlocutor = await UserModel.findOne({username: interlocutorUsername})
  if (!interlocutor) return res.sendStatus(404)
  interlocutor = interlocutor.getPublicProfile()
  const {_id:interlocutorId} = interlocutor

  try {


    const roomId = await PrivateRoomModel.findByUsers(userId, interlocutorId)
    if (roomId) return res.json(roomId)

  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500)
  }

  try {
    const roomId = await PrivateRoomModel.createRoom(req.body.middleware.user, interlocutor);
    res.status(201).json(roomId);
  } catch (error) {
    console.log('error 2');
    console.log(error.message);
    return res.sendStatus(500)
  }
};

module.exports.createPrivateRoom = createPrivateRoom;

