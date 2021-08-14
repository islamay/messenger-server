const mongoose = require("mongoose");
const UserModel = require('./user.model')

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
});

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  sender: {
    type: String,
  },
  time: {
    type: String,
  },
});

const PrivateRoomSchema = new mongoose.Schema({
  users: [UserSchema],
  messages: [MessageSchema],
});

PrivateRoomSchema.statics.createRoom = async function (user, interlocutor) {
  const PrivateRoomModel = this;

  const privateRoom = new PrivateRoomModel({
    users: [
      {
        userId: user._id,
      },
      {
        userId: interlocutor._id,
      },
    ],
  });

  try {
    await privateRoom.save();
    await Promise.all([
      user.addRoomToList(privateRoom._id),
      interlocutor.addRoomToList(privateRoom._id),
    ]);
    return privateRoom._id;
  } catch (error) {
    throw new Error(error.message);
  }
};

PrivateRoomSchema.statics.findByUsers = async function (userId, interlocutorId) {
  const PrivateRoomModel = this

  const roomId = await PrivateRoomModel.findOne({
    'users.userId': {
      $all: [userId, interlocutorId]
    }
  }, ['_id'])

  console.log(roomId);

  return roomId
}

PrivateRoomSchema.statics.findByIdAndGetDetail = async function (roomId, userId) {
  const PrivateRoomModel = this
  try {
    const privateRoom = await PrivateRoomModel.findById(roomId)
    const { userId: interlocutorId } = privateRoom.users.find((user) => user.userId !== String(userId))

    let user = await UserModel.findById(interlocutorId)
    user = user.getPublicProfile()
    delete user["rooms"]

    return user

  } catch (error) {
    return error
  }
}

const PrivateRoomModel = mongoose.model("privateRoom", PrivateRoomSchema);

module.exports = PrivateRoomModel;
