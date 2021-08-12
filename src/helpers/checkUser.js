const UserModel = require("../models/user.model");

const checkUser = async (userId) => {
  try {
    const user = await UserModel.findById(userId, ["-tokens", "-password"]);
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = checkUser;
