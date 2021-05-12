import axios from 'axios'

import * as actionTypes from './types'

const loadAdminStart = () => ({ type: actionTypes.LOAD_ADMIN_START })
const loadAdminError = () => ({ type: actionTypes.ADMIN_ERROR })
const loadAlerts = data => ({ type: actionTypes.LOAD_ADMIN_ALERTS, alerts: data })
const loadBranches = data => ({ type: actionTypes.LOAD_ADMIN_BRANCHES, branches: data })

//fetch all alerts from db
export const getAllAlerts = () => async dispatch => {
    dispatch(loadAdminStart())
    try {
        // const res = await axios.get('http://localhost:5000/api/alert')
        const res = await axios.get('/api/alert')
        dispatch(loadAlerts(res.data.alerts))
    } catch (error) {
        console.log(error, error.response)
        dispatch(loadAdminError(error))
    }
}

//fetch all branches from db
export const getAllBranches = () => async dispatch => {
    dispatch(loadAdminStart())
    try {
        const res = await axios.get('/api/branch')
        dispatch(loadBranches(res.data.branches))
    } catch (error) {
        console.log(error, error.response)
        dispatch(loadAdminError(error))
    }
}