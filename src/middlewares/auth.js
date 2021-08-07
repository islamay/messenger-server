require('../config/env')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

const auth = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) return res.sendStatus(401)

    const token = bearerToken.replace('Bearer ', '')

    console.log(token);

    const user = await UserModel.findOne({ 'tokens.payload': token }, ['-password'])
    if (!user) return res.sendStatus(401)

    try {
        jwt.verify(token, process.env.JWT_KEY)

        delete user.tokens

        req.body.middleware = {
            ...req.body.middleware,
            user: user
        }
        next()
    } catch (error) {
        await user.deleteJwt(token)
        res.status(401).json({ error: error.message })
    }

}

module.exports = auth