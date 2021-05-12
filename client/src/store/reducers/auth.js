import * as actionTypes from '../actions/types'

const initialState = {
    isAuth: false,
    branchid: null
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_LOAD_START: return { branchid: null }
        case actionTypes.LOAD_USER: return { branchid: action.branchid, isAuth: true }
        case actionTypes.AUTH_LOGOUT: return { branchid: null, isAuth: false }
        case actionTypes.AUTH_LOAD_ERROR: return { branchid: null, isAuth: false }
        default: return state
    }
}

export default reducer