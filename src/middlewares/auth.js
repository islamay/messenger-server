require('../config/env')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')
const parseToken = require('../helpers/parseToken')

const auth = async (req, res, next) => {
    const token = parseToken(req.body.authorization)

    const user = UserModel.findByToken(token)
    if (!user) return res.sendStatus(401)
    
    try {
        jwt.verify(token, process.env.JWT_KEY)
    } catch (error) {
        console.log('error in here');
        await user.deleteJwt(token)
        return res.status(401).json({ error: error.message })
    }

    req.body.middleware = {
        ...req.body.middleware,
        user: user.getPublicProfile()
    }

    next()

}

module.exports = auth