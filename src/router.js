import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Wall from 'components/Wall'
import Profile from 'components/Profile'
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
        <Route exact path='/login' render={ () => userService.user ?
          <Redirect to="/" /> :
          <Login />
        }/>
        <Route exact path='/register' render={ () => userService.user ?
          <Redirect to="/" /> :
          <Register />
        }/>
        <Route path='/wall/:id' render={ () => userService.user ?
          <Wall /> :
          <Redirect to="/" />
        }/>
        <Route path='/profile/:id' render={ () => userService.user ?
          <Profile /> :
          <Redirect to="/" />
        }/>
      </Switch>
    )
  }
}

export default Router
