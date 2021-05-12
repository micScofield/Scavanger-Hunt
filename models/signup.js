const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    branch: {type: String, required: true}
})

module.exports = Account = mongoose.model('Account', UserSchema)