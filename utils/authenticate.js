const Sentry = require('@sentry/node')
const jwt = require('jsonwebtoken')
const authenticate = (req, res, next) => {
    try {
        // console.log(req.headers)
        const authHeader = req.headers.authorization
        // console.log(authHeader)
        const token = authHeader.split(' ')[1]
        if (!token) res.status(401).json({
            message: `hasn't token`
        })
        jwt.verify(token, process.env.SECRET_KEY, (err, id) => {
            if (err) res.status(403).json({
                message: 'token is invalid'
            })
            req.idUser = id.id
            next()
        })
    } catch (e) {
        Sentry.captureException(e)
    }

}

module.exports = authenticate