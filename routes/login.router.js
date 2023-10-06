const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login.controller')
const {
    body
} = require('express-validator')
const validationBody = [
    // body('email').notEmpty().escape().isEmail(),
    body('login').notEmpty().escape().isString().isLength({// login or
        min: 3,
        max: 10
    }).withMessage('The login field must be between 3 and 10 characters long'),
    body('password').notEmpty().isString()
]
/**
 * @swagger
 * /api/login/:
 *   post:
 *     tags: 
 *       - Login
 *     description: use to login user
 *     requestBody:
 *       description: user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 default: login
 *               password:
 *                 type: string
 *                 default: password
 *     responses:
 *       '200':
 *         description: text
 *       '401':
 *         description: text 
 */
router.post('/', validationBody, loginController.login)

module.exports = router