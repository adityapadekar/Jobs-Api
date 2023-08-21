const User = require('../models//user')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors/index')

const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    // has the user provided the email and password
    // if (!email || !password) {
    //     throw new BadRequestError('Please provide email and password')
    // }

    const user = await User.findOne({ email })
    
    // is user with the email present

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    // check if the password matches
    const isPasswordCorrect = await user.checkPassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }


    // if everything is okay then send the token as well as username
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name } , token})

}

module.exports = {
    register,
    login
};
