const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {

        //retrieves token from the header of the HTTP request
        const token = req.header('Authorization').replace('Bearer ','')

        //attempts to verify the token retrieved above
        const decoded = jwt.verify(token, ';UV73yVT(56DP+')

        //attempts to find a User using the ID that is stored within the jwt, also checks if token is part of the User's token array
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        
        // stores the user token for this session
        req.token = token
        //stores the user into the request
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth