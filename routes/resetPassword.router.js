const express = require('express')
const router = express.Router()
const resetPasswordController = require('../controllers/resetPassword.controller')
/**
 * @swagger
 * /api/reset-password/:
 *   post:
 *     tags:
 *       - Reset Password
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
 *     description: returns ?????
 *     summary: use to reset password by email
 *     responses:
 *       '200':       
 *         description:  succesfully
 *       '400': 
 *         description: Email is not exist       
 */
router.post('/',resetPasswordController.sendURL)
/**
 * @swagger
 * /api/reset-password/enterNewPassword:
 *   post:
 *     tags:
 *       - Reset Password
 *     parameters:
 *       - name: token        
 *         in: query
 *         require: true
 *     requestBody:
 *       description: user
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               newPassword:
 *                 type: string
 *                 default: 123456     
 *     description: returns ?????
 *     summary: use to enter new password by email
 *     responses:
 *       '200':       
 *         description:  succesfully
 *       '400': 
 *         description: Email is not exist       
 */
router.post('/enterNewPassword',resetPasswordController.enterNewPassword)
module.exports = router