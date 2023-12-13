const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userId, firstName, lastName, email, username, password ) => {
    return jwt.sign({id: userId, firstName, lastName, email, username, password},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'15m'
    })
 }

module.exports.generateAccessToken = generateAccessToken