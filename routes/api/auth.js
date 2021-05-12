const express = require('express')
const { check } = require('express-validator')

const AuthController = require('../../controllers/auth')

const router = express.Router()

//login  @access=public
router.post('/', [
    check('username', 'Please enter name').notEmpty(),
    check('password', 'Please enter password').notEmpty()
], AuthController.Login)

//In case we need to add more branch accounts, use below API to setup an account
router.post('/signup', AuthController.Signup)

module.exports = router