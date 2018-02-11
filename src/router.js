import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Wall from 'views/Wall'
import Timeline from 'views/Timeline'
import Login from 'views/Login'
import Register from 'views/Register'
import FindUsersToFollow from 'views/FindUsersToFollow'
import userService from 'services/User'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    userService.user ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
)

class Router extends Component {
  render () {
    return (
      <Switch>
        <PrivateRoute exact path='/' component={Wall} />
        <PrivateRoute exact path='/wall' component={Wall} />
        <PrivateRoute path='/wall/:id' component={Wall} />
        <PrivateRoute exact path='/timeline' component={Timeline} />
        <PrivateRoute path='/timeline/:id' component={Timeline} />
        <PrivateRoute path='/findUsers' component={FindUsersToFollow} />
        <Route exact path='/login' render={() => userService.user
          ? <Redirect to='/' />
          : <Login />
        } />
        <Route exact path='/register' render={() => userService.user
          ? <Redirect to='/' />
          : <Register />
        } />
      </Switch>
    )
  }
}

export default Router
