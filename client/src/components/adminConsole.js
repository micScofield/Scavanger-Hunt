import { Fragment, useState } from 'react'
import { connect } from 'react-redux'

import { getAllAlerts, getAllBranches } from '../store/actions/admin'
import Spinner from './ui/spinner'
import AdminAlerts from './admin/adminAlerts'
import AdminBranches from './admin/adminBranches'

const AdminConsole = ({ getAllAlerts, alerts, isAuth, history, branchid, loading, getAllBranches, branches }) => {

    const [showalerts, setshowalerts] = useState(false)
    const [showbranches, setshowbranches] = useState(false)

    //fetch request to server
    const fetchAlerts = async () => {
        await getAllAlerts()
        setshowbranches(false)
        setshowalerts(true)
    }

    //fetch request to server
    const fetchBranches = async () => {
        await getAllBranches()
        setshowalerts(false)
        setshowbranches(true)
    }

    if (!isAuth) {
        return <div className='container'>

            <h2>Not Authorized ! Please <button className='btn btn-large btn-dark' onClick={() => history.push('/login')}>Login</button></h2>

        </div>
    } else if (isAuth && branchid !== 'admin') {
        return <div className='container'>

            <h2>Not Authorized As Administrator! Please <button className='btn btn-large btn-dark' onClick={() => history.push('/login')}>Try Again</button></h2>

        </div>
    } else {
        return <Fragment>
            <div className='container'>

                <h2>Admin Console <i className="fas fa-hat-wizard"></i></h2>

                <button className='btn btn-large btn-primary' onClick={fetchBranches}><i className='fas fa-code-branch'></i> Display Branches</button>
                <button className='btn btn-large btn-dark' onClick={fetchAlerts}><i className='fas fa-bell'></i> Display All Alerts</button>

                <div className='my-top-2'></div>

                {!loading && showalerts && <AdminAlerts alerts={alerts} />}

                {!loading && showbranches && <AdminBranches branches={branches} />}

                {loading && <Spinner />}
                
            </div>
        </Fragment>
    }
}

const mapStateToProps = state => ({
    alerts: state.admin.alerts,
    branches: state.admin.branches,
    loading: state.admin.loading,
    branchid: state.auth.branchid,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { getAllAlerts, getAllBranches })(AdminConsole)