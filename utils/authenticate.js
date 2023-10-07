const Sentry = require('@sentry/node')
const jwt = require('jsonwebtoken')
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.status(401).json({
            message: `hasn't token`
        })
        jwt.verify(token, process.env.SECRET_KEY, (err, id) => {
            if (err) return res.status(403).json({
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