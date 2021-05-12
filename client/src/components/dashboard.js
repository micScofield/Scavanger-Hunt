import { Fragment, useState } from 'react'
import { connect } from 'react-redux'

import { setAlert } from '../store/actions/alert'
import { getBranches } from '../store/actions/branch'
import { isEmail } from '../utility/checkValidity'
import Spinner from './ui/spinner'

const Dashboard = ({ alertMsg, alertType, setAlert, getBranches, loading, branches, history }) => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [mobile, setmobile] = useState('')
    const [pin, setpin] = useState('')

    const submitHandler = () => {
        //Input validation
        if (name.trim().length === 0) {
            setAlert('danger', 'Please enter name')
        } else if (email.trim().length === 0) {
            setAlert('danger', 'Please enter email')
        } else if (!isEmail(email)) {
            setAlert('danger', 'Please enter a valid email address')
        } else if (mobile.trim().length === 0) {
            setAlert('danger', 'Please enter mobile')
        } else if (pin.trim().length === 0) {
            setAlert('danger', 'Please enter pin')
        } else if (pin.trim().length !== 6) {
            setAlert('danger', 'Pin must be of exactly 6 numbers')
        } else if (mobile.trim().length !== 10) {
            setAlert('danger', 'Mobile must be of 10 numbers')
        } else {
            const obj = { name, email, mobile, pin }
            //send request
            getBranches(obj, history)
            setname('')
            setemail('')
            setmobile('')
            setpin('')
        }
    }

    //alert classes
    let alertCssClass = ['alert my-bottom-1']
    if (alertType === 'danger') { alertCssClass.push('alert-dark') }

    if (loading) return <Spinner />

    return <Fragment>
        <div className='container'>
            <h2><i className='fas fa-user large'></i> Dashboard</h2>

            <div className='form-container'>

                <h1 className='medium my-bottom-2'><i className='fab fa-wpforms'></i> Please Fill This Out</h1>

                {alertMsg ? <p className={alertCssClass.join(' ')}>{alertMsg}</p> : null}

                <div>
                    <input type='text' placeholder='Enter name' name='name' value={name} onChange={e => setname(e.target.value)} />
                    <input type='text' placeholder='Enter email' name='email' value={email} onChange={e => setemail(e.target.value)} />
                    <input type='text' placeholder='Enter mobile' name='mobile' value={mobile} onChange={e => setmobile(e.target.value)} />
                    <input type='text' placeholder='Enter pin' name='pin' value={pin} onChange={e => setpin(e.target.value)} />
                    <button className='btn btn-large btn-primary' onClick={submitHandler}>Submit</button>
                </div>
                
            </div>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    alertMsg: state.alert.msg,
    alertType: state.alert.type,
    loading: state.branch.loading,
    branches: state.branch.branches
})

export default connect(mapStateToProps, { setAlert, getBranches })(Dashboard)