const UserModel = require("../models/user.model");
const parseToken = require("../helpers/parseToken");

const signup = async (req, res) => {
  try {
    const token = await UserModel.signup(req.body);
    res.json(token);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.signup = signup;

const login = async (req, res) => {
  try {
    const token = await UserModel.login(req.body);
    res.json(token);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

module.exports.login = login;

const logout = async (req, res) => {
  const token = parseToken(req.headers.authorization);

  try {
    await UserModel.logout(token);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports.logout = logout;
