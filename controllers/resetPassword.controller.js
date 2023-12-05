const Sentry = require('@sentry/node')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mailgun = require('mailgun-js')
const resetPassword = require('../services/resetPassword.service')
const resetPasswordService = require('../services/resetPassword.service')
class resetPasswordController {
    async sendURL(req, res) {
        try {
            const mg = mailgun({
                apiKey: '2a8e4d7214005ab03bd4c4e0fbf3ebbf-5465e583-886383b6',
                domain: 'sandboxff7d33a21f9a4411a8ee8ce79e98ff01.mailgun.org'
            })

            const user = await resetPassword.getUser(req.body.email)
            if (!user) {
                return res.status(404).json({
                    message: 'email not found'
                })
            }
            const id = {
                id: user.id,
                type: 'password_reset_token'
            }
            const token = jwt.sign({
                id
            }, process.env.SECRET_KEY)
            const URL = 'http://localhost:3000/api/reset-password/enterNewPassword?token=' + token

            const data = {
                from: 'Example Sender <mail@example.com>',
                to: user.email,
                subject: 'Hello',
                text: URL
            }
            mg.messages().send(data, function (error, body) {
                if (error) return res.status(500).json({
                    error: error.message
                })
                res.send({
                    "message": 'succesfull'
                })
            })


        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async enterNewPassword(req, res) {
        try {
            const saltRounds = 4
            jwt.verify(req.query.token, process.env.SECRET_KEY, (err, result) => {
                if (err) return res.status(403).json({
                    message: 'token is invalid'
                })
                req.userId = result.id
            })
            const hashedPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
            const user = await resetPasswordService.setNewPassword(req.userId.id, hashedPassword)
            res.send(user)
        } catch (e) {
            Sentry.captureException(e)
        }
    }
}
module.exports = new resetPasswordController()