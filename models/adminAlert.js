const mongoose = require('mongoose')

const AdminAlertSchema = new mongoose.Schema({
    branchids: { type: [String], required: true },
    info: { type: Object, required: true },
    msg: { type: String },
    date: { type: Date, default: Date.now }
})

module.exports = AdminAlert = mongoose.model('AdminAlert', AdminAlertSchema)