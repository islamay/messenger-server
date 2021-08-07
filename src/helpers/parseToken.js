const parseToken = (rawToken) => {
    let token = rawToken

    if (!token) return res.sendStatus(401)

    token = token.replace('Bearer ', '')

    return token
}

module.exports = parseToken