import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Landing = ({isAuth, history}) => {
    return <Fragment>
        <section className='landing'>
            <div className='landingOverlay'>
                <div className='landingInner'>

                    <h1 className='x-large'>Beetle Nut Solutions</h1>

                    <p className='large'>Hunt for your favorite donuts in the city</p>

                    <div className='buttons'>
                        {!isAuth ? <Link to='/login' className='btn btn-light'>Login</Link> : <Link to='/logout' className='btn btn-danger'><i className='fas fa-sign-out-alt'></i> Logout</Link> }

                        {!isAuth && <Link to='/dashboard' className='btn btn-primary'>Search for Donuts</Link>}
                        
                        {isAuth && <button className='btn btn-light btn-large' onClick={() => history.goBack()}>Go Back</button>}
                    </div>

                </div>
            </div>
        </section>
    </Fragment>
}

const mapStateToProps = state => ({ isAuth: state.auth.isAuth })

export default connect(mapStateToProps)(Landing)