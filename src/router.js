import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Wall from 'components/Wall'
import Profile from 'components/Profile'
import Login from 'components/Login'
import Register from 'components/Register'
import userService from 'services/User'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    userService.user ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class Router extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path='/' component={Wall} />
        <PrivateRoute path='/wall/:id' component={Wall} />
        <PrivateRoute path='/profile/:id' component={Profile} />
        <Route exact path='/login' render={ () => userService.user ?
          <Redirect to="/" /> :
          <Login />
        }/>
        <Route exact path='/register' render={ () => userService.user ?
          <Redirect to="/" /> :
          <Register />
        }/>
      </Switch>
    )
  }
}

export default Router
