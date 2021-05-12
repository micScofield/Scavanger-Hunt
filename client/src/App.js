import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Dashboard from './components/dashboard'
import Navbar from './components/navbar'
import Landing from './components/landing'
import Login from './components/login'
import Logout from './components/logout'
import Branches from './components/branches'
import Branch from './components/branch'
import AdminConsole from './components/adminConsole'
import { checkAuthUser } from './store/actions/auth'

import './App.css';

const App = props => {

  const { checkAuthUser } = props

  useEffect(() => {
    checkAuthUser()
  }, [checkAuthUser])

  //Specify which routes can be accessible based on authentication
  let routes = (
    <Switch>
      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/login' exact component={Login} />
      <Route path='/branches' exact component={Branches} />
      <Route path='/branch/:id' exact component={Branch} />
      <Route path='/admin-console' exact component={AdminConsole} />
      <Route path='/' exact component={Landing} />
      <Redirect to='/' />
    </Switch>
  )

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/branches' exact component={Branches} />
        <Route path='/branch/:id' exact component={Branch} />
        <Route path='/admin-console' exact component={AdminConsole} />
        <Route path='/' exact component={Landing} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Router>
      <Fragment>
        <Navbar />
        {routes}
      </Fragment>
    </Router>
  )
}

const mapStateToProps = state => ({ 
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { checkAuthUser })(App)