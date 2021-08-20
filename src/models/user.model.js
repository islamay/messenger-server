require("../config/env");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const defaultImgSrc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

const TokenSchema = new mongoose.Schema({
  payload: {
    type: String,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 256,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!isEmail(value)) throw new Error("email not valid");
    },
  },
  imgSrc: {
    type: String,
    required: true,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  },
  rooms: [{ roomId: { type: String } }],
  tokens: {
    type: [TokenSchema],
  },
});

UserSchema.statics.signup = async function ({ username, password, email }) {
  const UserModel = this;

  const user = new UserModel(arguments[0]);
  await user.save();

  const token = await user.generateJwt();
  const publicProfile = user.getPublicProfile()
  return { token, publicProfile };
};

UserSchema.statics.login = async function ({ username, password }) {
  const UserModel = this;

  const user = await UserModel.findOne({ username: username });

  if (!user) throw new Error("username not found");

  const isValidated = await bcrypt.compare(password, user.password);

  if (!isValidated) throw new Error("incorrect password");

  const token = await user.generateJwt();
  const publicProfile = user.getPublicProfile()

  return { token, publicProfile };
};

UserSchema.statics.logout = async function (token) {
  const UserModel = this;

  const user = await UserModel.findByToken(token);
  if (!user) throw new Error("user not found");

  await user.deleteJwt(token);
};

UserSchema.statics.findByToken = async function (token) {
  const UserModel = this;

  const user = await UserModel.findOne({ "tokens.payload": token });

  return user;
};

UserSchema.methods.generateJwt = async function () {
  const user = this;

  const token = jwt.sign({ username: user.username }, process.env.JWT_KEY, {
    expiresIn: "14 days",
  });
  user.tokens.push({ payload: token });

  await user.save();

  return token;
};

UserSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject["password"];
  delete userObject["tokens"];
  delete userObject['email']

  return userObject;
};

UserSchema.methods.deleteJwt = async function (tokenGiven) {
  const user = this;

  await user.tokens.forEach(async (token, index) => {
    if (token.payload === tokenGiven) {
      user.tokens.splice(index, "1");
      await user.save();
    }
  });
};

UserSchema.methods.addRoomToList = async function (roomId) {
  const user = this;

  user.rooms.push({ roomId: roomId });
  await user.save();
};

UserSchema.post("validate", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

UserSchema.pre('validate', function () {
  const user = this
  if (user.imgSrc === null) user.imgSrc = defaultImgSrc
})

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
