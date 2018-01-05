import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from 'components/Login'
import Wall from 'components/Wall'
import userService from 'services/User'

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={ () => userService.user ?
          <Wall /> :
          <Redirect to="/login" />
        }/>
        <Route path='/login' render={ () => userService.user ?
          <Redirect to="/" /> :
          <Login />
        }/>
      </Switch>
    )
  }
}

export default Router
