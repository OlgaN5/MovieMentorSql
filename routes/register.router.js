const express = require('express')
const router = express.Router()
const registerController = require('../controllers/register.controller')
const {
    body
} = require('express-validator')
const validationBody = [
    body('email').notEmpty().escape().isEmail(),
    body('login').notEmpty().escape().isString().isLength({
        min: 3,
        max: 10
    }).withMessage('The login field must be between 3 and 10 characters long'),
    body('password').notEmpty().isString()
]
/**
 * @swagger
 * /api/register/:
 *   post:
 *     tags:
 *       - Register
 *     requestBody:
 *       description: user
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               email:
 *                 type: string
 *                 default: email@gmail.com
 *               login:
 *                 type: string
 *                 default: login
 *               password:
 *                 type: string
 *                 default: password              
 *     description: use to register user
 *     responses:
 *       '200': 
 *         description: user registered
 *       '401': 
 *         description: not authorization *       
 */

router.post('/', validationBody, registerController.register)

module.exports = router