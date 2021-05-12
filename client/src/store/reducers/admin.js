import * as actionTypes from '../actions/types'

const initialState = {
    branches: null,
    loading: false,
    alerts: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ADMIN_START: return { branches: null, loading: true, alerts: null }
        case actionTypes.LOAD_ADMIN_BRANCHES: return { ...state, branches: action.branches, loading: false }
        case actionTypes.LOAD_ADMIN_ALERTS: return { ...state, alerts: action.alerts, loading: false }
        case actionTypes.ADMIN_ERROR: return { branches: null, loading: false, alerts: null }
        default: return state
    }
}

export default reducer