const mongoose = require("mongoose");

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

const PrivateRoomModel = mongoose.model("privateRoom", PrivateRoomSchema);

module.exports = PrivateRoomModel;
