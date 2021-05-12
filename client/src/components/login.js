import { Fragment, useState } from 'react'
import { connect } from 'react-redux'

import { setAlert } from '../store/actions/alert'
import { login } from '../store/actions/auth'
import Spinner from './ui/spinner'

const Login = ({ setAlert, alertMsg, alertType, login, history }) => {

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false)

    const loginHandler = async() => {
        setloading(true)
        if (username.trim().length === 0) {
            setAlert('danger', 'Please enter username')
        } else if (password.trim().length === 0) {
            setAlert('danger', 'Please enter password')
        } else {
            const obj = { username, password }

            //send login request
            await login(obj, history)
            //following state update is done on a unmounted component, will be fixed later
            setloading(false)
        }
    }

    //specify alert classes based on alert types
    let alertCssClass = ['alert my-bottom-1']
    if (alertType === 'danger') { alertCssClass.push('alert-dark') }

    if (loading) return <Spinner />

    return <Fragment>
        <div className='container'>
            <div className='form-container'>

                <h1 className='large my-bottom-2'><i className='fas fa-user'></i> Please Login</h1>

                {alertMsg ? <p className={alertCssClass.join(' ')}>{alertMsg}</p> : null}

                <div>
                    <input type='text' placeholder='Enter username' name='username' autoFocus value={username} onChange={e => setusername(e.target.value)} />
                    <input type='password' placeholder='Enter password' name='password' value={password} onChange={e => setpassword(e.target.value)} />
                    <button className='btn btn-large btn-primary' onClick={loginHandler}>Login</button>
                </div>
                
            </div>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    alertMsg: state.alert.msg,
    alertType: state.alert.type
})

export default connect(mapStateToProps, { setAlert, login })(Login)