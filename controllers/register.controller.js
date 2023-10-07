const registerService = require('../services/register.service')
const bcrypt = require('bcrypt')
const Sentry = require('@sentry/node')
const {
    validationResult
} = require('express-validator')
class registerController {
    async register(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                let user = null
                const saltRounds = 4
                const {
                    email,
                    login,
                    password
                } = req.body
                const isEmail = await registerService.findUserByEmail(email)
                const isLogin = await registerService.findUserByLogin(login)
                if (isEmail) {
                    return res.status(400).json({
                        message: 'email is exist'
                    })
                }
                if (isLogin) {
                    return res.status(400).json({
                        message: 'login is exist'
                    })
                }
                const hashedPassword = await bcrypt.hashSync(password, saltRounds)
                user = await registerService.createUser({
                    email,
                    login,
                    password: hashedPassword
                })
                res.send(user)
            } else {
                res.status(400).json({
                    message: 'invalid fields',
                    errors: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
}

module.exports = new registerController()