const PrivateRoomModel = require("../models/privateRoom.model");
const checkUser = require("../helpers/checkUser");

const createPrivateRoom = async (req, res) => {
  const { interlocutorId } = req.body;
  const { _id: userId } = req.body.middleware.user;

  const user = await checkUser(userId);
  const interlocutor = await checkUser(interlocutorId);
  if (!user) return res.sendStatus(400);
  if (!interlocutor) return res.sendStatus(400);

  try {
    const roomId = await PrivateRoomModel.createRoom(user, interlocutor);
    res.status(201).json(roomId);
  } catch (error) {}
};

module.exports.createPrivateRoom = createPrivateRoom;
