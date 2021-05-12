import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { getAlertsById } from '../store/actions/branch'
import Spinner from './ui/spinner'
import BranchAlertItem from './branchAlertItem'

const Branch = ({ match, getAlertsById, alerts, loading, isAuth, history }) => {

    const branchid = match.params.id

    //Fetch alerts on mount
    useEffect(() => {
        getAlertsById({ branchid })
    }, [getAlertsById, branchid])

    if (loading) return <Spinner />

    if (!loading) return isAuth ? <Fragment>
        <div className='container'>

            {alerts && alerts.length === 0 ? <h2>No alerts to show !</h2> : <div>

                <h2><i className='fas fa-bell'></i> Most recent first: </h2>

                <div className='cards'>
                    {alerts && alerts.map(alert => <BranchAlertItem alert={alert} key={alert._id} />)}
                </div>
                
            </div>}

        </div>
    </Fragment> : <div className='container'>

        <h2>Not Authorized ! Please <button className='btn btn-large btn-dark' onClick={() => history.push('/login')}>Login</button></h2>

    </div>
}

const mapStateToProps = state => ({
    loading: state.branch.loading,
    alerts: state.branch.alerts,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { getAlertsById })(Branch)