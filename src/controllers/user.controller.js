const UserModel = require('../models/user.model')

const signup = async (req, res) => {
    try {
        const token = await UserModel.signup(req.body)
        res.json(token)
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

module.exports.signup = signup

const login = async (req, res) => {
    try {
        const token = await UserModel.login(req.body)
        res.json(token)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.login = login