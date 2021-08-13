const PrivateRoomModel = require("../models/privateRoom.model");
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
  const { interlocutorId } = req.body;
  const { _id: userId } = req.body.middleware.user;

  const user = await checkUser(userId);
  const interlocutor = await checkUser(interlocutorId);
  if (!user) return res.sendStatus(400);
  if (!interlocutor) return res.sendStatus(400);

  try {
    const roomId = await PrivateRoomModel.findByUsers(userId, interlocutorId)
    if (roomId) return res.json(roomId)

  } catch (error) {
    return res.sendStatus(500)
  }

  try {
    const roomId = await PrivateRoomModel.createRoom(user, interlocutor);
    res.status(201).json(roomId);
  } catch (error) {
    return res.sendStatus(500)
  }
};

module.exports.createPrivateRoom = createPrivateRoom;

