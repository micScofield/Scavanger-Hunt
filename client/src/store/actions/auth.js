import axios from 'axios'

import * as actionTypes from './types'
import { setAlert } from '../actions/alert'

const loadStart = () => ({ type: actionTypes.AUTH_LOAD_START })
const loadEnd = () => ({ type: actionTypes.AUTH_LOAD_ERROR })
const logUserOut = () => ({ type: actionTypes.AUTH_LOGOUT })
const loadUser = data => ({ type: actionTypes.LOAD_USER, branchid: data })

export const login = (obj, history) => async dispatch => {
    dispatch(loadStart())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        // const res = await axios.post('http://localhost:5000/api/auth', JSON.stringify(obj), config)
        const res = await axios.post('/api/auth', JSON.stringify(obj), config)
        localStorage.setItem('x-auth-token', res.data.token)
        localStorage.setItem('branchid', res.data.branch)
        dispatch(loadUser(res.data.branch))
        if (res.status === 200) {
            if (res.data.branch === 'admin') {
                history.push(`/admin-console`)
            } else {
                history.push(`/branch/${res.data.branch}`)
            }
        }
    } catch (error) {
        console.log(error, error.response)
        dispatch(loadEnd())
        if (error.response.status === 401) {
            dispatch(setAlert('danger', 'Invalid Credentials, Please Try Again !'))
        }
    }
}

export const logout = () => dispatch => dispatch(logUserOut())

export const checkAuthUser = () => dispatch => {
    const token = localStorage.getItem('x-auth-token')
    const branchid = localStorage.getItem('branchid')
    if(!token || !branchid) {
        dispatch(logUserOut())
    } else {
        dispatch(loadUser(branchid))
    }
}