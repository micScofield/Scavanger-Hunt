import axios from 'axios'

import * as actionTypes from './types'

const loadStart = () => ({ type: actionTypes.BRANCH_LOAD_START })
const loadBranches = data => ({ type: actionTypes.LOAD_BRANCHES, branches: data })
const loadAlerts = data => ({ type: actionTypes.LOAD_ALERTS, alerts: data })
const loadError = data => ({ type: actionTypes.BRANCH_LOAD_ERROR, err: data })

//fetch branches by PIN from db
export const getBranches = (obj, history) => async dispatch => {
    dispatch(loadStart())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        // const res = await axios.post('http://localhost:5000/api/branch', JSON.stringify(obj), config)
        const res = await axios.post('/api/branch', JSON.stringify(obj), config)
        dispatch(loadBranches(res.data.branches))
        history.push('/branches')
    } catch (error) {
        console.log(error, error.response)
        dispatch(loadError(error.response.data.msg))
    }
}

//fetch alerts by branch id from db
export const getAlertsById = branchid => async dispatch => {
    dispatch(loadStart())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        // const res = await axios.post('http://localhost:5000/api/alert', JSON.stringify(branchid), config)
        const res = await axios.post('/api/alert', JSON.stringify(branchid), config)
        dispatch(loadAlerts(res.data.alerts))
    } catch (error) {
        console.log(error, error.response)
        dispatch(loadError(error))
        // dispatch(loadError(error.response.data.msg))
    }
}