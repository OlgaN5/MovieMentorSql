const loginService = require('../services/login.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Sentry = require('@sentry/node')
const {
    validationResult
} = require('express-validator')
class loginController {
    async login(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                let token = null
                const {
                    login,
                    email,
                    password
                } = req.body
                const user = await loginService.getUser(login, email)
                if (user) {
                    const compare = await bcrypt.compare(password, user.password)
                    console.log(password, user.password)
                    const {
                        id
                    } = user
                    if (compare) {
                        token = jwt.sign({
                            id
                        }, process.env.SECRET_KEY)
                    } else {
                        return res.status(404).json({
                            message: 'password is wrong'
                        })
                    }
                } else {
                    return res.status(400).json({
                        'message': 'login not exist'
                    })
                }
                console.log('token', token)
                // if (!token) 
                res.send(token)
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

module.exports = new loginController()