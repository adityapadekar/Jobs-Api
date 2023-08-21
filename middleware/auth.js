const User = require('../models/user')
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index');

const auth = (req, res, next) =>
{
    // check for the header and check if it starts with bearer
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication Error')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId,name:payload.name}
        next()
    }
    catch (error) {
        throw new UnauthenticatedError('Authentication Error')
    }
}
module.exports = auth



