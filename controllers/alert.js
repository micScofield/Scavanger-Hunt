const Alert = require('../models/alert')
const AdminAlert = require('../models/adminAlert')

const getAllAlerts = async (req, res, next) => {
    let alerts
    try {
        alerts = await AdminAlert.find().sort({'date': '-1'})
        return res.json({ alerts: alerts })
    } catch (error) {
        return res.status(500).json({ msg: 'server/DB error' })
    }
}

const getAlertsByBranchid = async (req, res, next) => {
    const { branchid } = req.body
    let alerts
    try {
        alerts = await Alert.find({branchids : branchid}).select('-branchids').sort({'date': '-1'})

        return res.json({ alerts: alerts })
    } catch (error) {
        return res.status(500).json({ msg: 'server/DB error' })
    }
}

exports.GetAllAlerts = getAllAlerts
exports.GetAlertsByBranchid = getAlertsByBranchid