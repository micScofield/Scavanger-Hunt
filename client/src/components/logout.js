import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { logout } from '../store/actions/auth'

const Logout = ({ logout }) => {

    localStorage.removeItem('x-auth-token')
    localStorage.removeItem('branchid')

    useEffect(() => {
        logout()
    }, [logout])

    return <Fragment>
        <div className='container'>
            <h2>Logged Out Successfully <i className='fas fa-smile'></i></h2>
        </div>
    </Fragment>
}

export default connect(null, { logout })(Logout)