const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { validationResult } = require('express-validator')

const Account = require('../models/signup')

const loginUsingJwt = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { username, password } = req.body

    let user
    try {
        user = await Account.findOne({ username: username })
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            if (checkPassword) {
                //generate a token
                const payload = {
                    user: {
                        id: user.id
                    }
                }

                jwt.sign(
                    payload,
                    config.get('jwt_secret_key'),
                    { expiresIn: '10h' },
                    (error, token) => {
                        if (error) {
                            return res.status(401).json({msg: 'Incorrect password. Please try again'})
                        }
                        return res.status(200).json({ branch: user.branch, token: token })
                    })
            } else {
                return res.status(401).json({msg: 'Incorrect password. Please try again'})
            }
        } else {
            return res.status(404).json({msg: 'No user with provided username exists.'})
        }
    } catch (error) {
        return res.status(500).json({msg: 'Server Error. Please try again'})
    }
}

const signup = async (req, res, next) => {
    const { user: { username, password }, branch } = req.body

    //encrypt the password and store in db
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new Account({
        username,
        password: hashedPassword,
        branch
    })

    try {
        await user.save()
    } catch (error) {
        return res.status(500).json({ msg: 'Server Error' })
    }

    //create a token
    const payload = {
        user: {
            id: user.id //mongoose abstracts _id from mongo DB to id
        }
    }

    jwt.sign(
        payload,
        config.get('jwt_secret_key'),
        { expiresIn: '1h' },
        (error, token) => {
            if (error) {
                return res.status(500).json({ msg: 'Server Error' })
            }
            return res.status(201).json({ msg: 'User added', token })
        })
}

//Use below if no JWT auth required and not using accounts collection

// const login = async (req, res, next) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() })
//     }

//     const { username, password } = req.body

//     const output = getUsers().filter(user => user.user.username === username && user.user.password === password)[0]
//     if (output === null || output === undefined) {
//         //send admin alert for unauthorized access
//         const newAdminAlert = new AdminAlert({
//             branchids: [],
//             info: {},
//             msg: `Unauthorized access from user ${username}`
//         })
//         await newAdminAlert.save()

//         return res.status(401).json({ msg: 'unauthorized !' })
//     }
//     return res.status(200).json({ branch: output.branch, token: 'auth-token' })
// }

// exports.Login = login
exports.Signup = signup
exports.Login = loginUsingJwt