import * as actionTypes from '../actions/types'

const initialState = {
    msg: null,
    type: null
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_ALERT: return { msg: action.alertMsg, type: action.alertType }
        case actionTypes.REMOVE_ALERT: return { msg: null, type: null }
        default: return state
    }
}

export default reducer