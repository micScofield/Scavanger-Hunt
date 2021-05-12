const mongoose = require('mongoose')

const AlertSchema = new mongoose.Schema({
    branchids: {type: [String] , required: true},
    info: {type: Object, required: true},
    date: {type: Date, default: Date.now}    
})

module.exports = Alert = mongoose.model('Alert', AlertSchema)