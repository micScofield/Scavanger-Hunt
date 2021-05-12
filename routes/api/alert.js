const express = require('express')

const AlertController = require('../../controllers/alert')

const router = express.Router()

//get all alerts for admin account  @access=private
router.get('/', AlertController.GetAllAlerts)

//get alerts by branch @access=private
router.post('/', AlertController.GetAlertsByBranchid)

module.exports = router