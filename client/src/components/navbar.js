import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = ({isAuth}) => {
    let navLinks = (
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    if(isAuth) {
        navLinks = (
            <ul>
                {/* <li><Link to="/dashboard"><i className="fas fa-user"></i>{' '}<span className="hide-sm">Dashboard</span></Link></li> */}
                <li><Link to="/logout"><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></Link></li>
            </ul>
        )
    }

    return <Fragment>
        <nav className='navbar'>
            <h1>
                <Link to='/'><i className="fas fa-search"></i>{' '}<span className="hide-sm">Scavanger Hunt</span></Link>
            </h1>
            {navLinks}
        </nav>
    </Fragment>
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(Navbar)