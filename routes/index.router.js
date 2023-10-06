const express = require('express')
const router = express.Router()
const registerRouter = require('./register.router')
const loginRouter = require('./login.router')
const moviesRouter = require('./movies.router')
router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/movies', moviesRouter)
module.exports = router