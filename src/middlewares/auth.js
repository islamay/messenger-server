require('../config/env')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

const auth = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) return res.sendStatus(401)

    const token = bearerToken.replace('Bearer ', '')

    const user = await UserModel.findOne({ 'tokens.payload': token }, ['-password'])
    if (!user) return res.sendStatus(401)

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    } catch (error) {

    }

    delete user.tokens

    req.body.middleware = {
        ...req.body.middleware,
        user: user
    }

    res.send('OK')
}

module.exports = auth