import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Wall from 'components/Wall'
import Login from 'components/Login'
import Register from 'components/Register'
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
      <Route path='/register' render={ () => userService.user ?
          <Redirect to="/" /> :
          <Register />
        }/>
      </Switch>
    )
  }
}

export default Router
