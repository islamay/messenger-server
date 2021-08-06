require('../config/env')
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const TokenSchema = new mongoose.Schema({
    payload: {
        type: String
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 256
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!isEmail(value)) throw new Error('email not valid')
        }
    },
    tokens: {
        type: [TokenSchema]
    }
})

UserSchema.statics.signup = async function ({ username, password, email }) {
    const UserModel = this

    const user = new UserModel(arguments[0])
    await user.save()

    const token = user.generateJwt()
    return token
}

UserSchema.statics.login = async function ({ username, password }) {
    const UserModel = this

    const user = await UserModel.findOne({ username: username })

    if (!user) throw new Error('username not found')

    const isValidated = await bcrypt.compare(password, user.password)
    console.log(password);

    if (!isValidated) throw new Error('incorrect password')

    const token = user.generateJwt()

    return token
}

UserSchema.methods.generateJwt = async function () {
    const user = this

    const token = jwt.sign({ username: user.username }, process.env.JWT_KEY, { expiresIn: '1s' })
    user.tokens.push({ payload: token })

    await user.save()

    return token
}

UserSchema.methods.deleteJwt = async function (token) {
    const user = this


}

UserSchema.post('validate', async function () {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel