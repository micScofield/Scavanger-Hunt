const mongoose = require('mongoose')

const BranchSchema = new mongoose.Schema({
    InstitutionName: {type: String, required: true},
    BranchName: {type: String, required: true, unique: true},
    Address: {type: String, required: true},
    City: {type: String, required: true},
    ContactNumber: {type: String, required: true},
    BranchIncharge: {type: String, required: true},    
    PincodeCovered: {type: String, required: true}
})

module.exports = Branch = mongoose.model('Branch', BranchSchema)