const express = require('express')
const { check } = require('express-validator')

const BranchController = require('../../controllers/branch')

const router = express.Router()

//get all branches [only for admin] @access=private
router.get('/', BranchController.GetAllBranches)

//get branch(es) by PINCODE [Only for branch users] @access=private
router.post('/', [
    check('name', 'Please enter name').notEmpty(),
    check('email', 'Please enter email').notEmpty(),
    check('mobile', 'Please enter mobile number').notEmpty(),
    check('pin', 'Please enter pin').notEmpty()
], BranchController.GetBranchesByPin)

module.exports = router