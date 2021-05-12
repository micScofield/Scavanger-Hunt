const { validationResult } = require('express-validator')

const Branch = require('../models/branch')
const Alert = require('../models/alert')
const AdminAlert = require('../models/adminAlert')

//Get all branches from branches collection (for admin use only)
const getAllBranches = async (req, res, next) => {
    let branches
    try {
        branches = await Branch.find()
        return res.json({ branches: branches })
    } catch (error) {
        return res.status(500).json({ msg: 'server/DB error' })
    }
}

//Get all branches from branches collection by PINCODE (for customer use only)
const getBranchesByPin = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { name, email, mobile, pin } = req.body
    
    let branches
    try {
        //fetch branches by pin
        branches = await Branch.find({"Pincode covered" : {$regex: pin}})

        if(branches === null || branches.length === 0) {
            //set alert to admin that this pincode was searched by username
            const notFoundAlert = new AdminAlert({
                branchids: [],
                info: { name, email, mobile },
                msg: `User ${name} has searched for donuts in ${pin} and found nothing !`
            })
            await notFoundAlert.save()
            return res.json({msg: 'Bad Bad Luck, No Donut For You !'})
        }

        //storing the data inside alerts collection so branches can get an alert
        let arr = []
        branches.forEach(branch => arr.push(branch._id.toString()))

        const newAlert = new Alert({
            branchids: arr,
            info: { name, email, mobile }
        })
        await newAlert.save()

        //doing the same for admin as well
        const newAdminAlert = new AdminAlert({
            branchids: arr,
            info: { name, email, mobile },
            msg: `User ${name} has logged in and searching for donuts at ${pin}`
        })
        await newAdminAlert.save()

        return res.json({ branches })
    } catch (error) {
        return res.status(500).json({ msg: 'server/DB error' })
    }
}

exports.GetAllBranches = getAllBranches
exports.GetBranchesByPin = getBranchesByPin