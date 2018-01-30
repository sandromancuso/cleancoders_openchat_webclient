import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import userService from 'services/User'

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  logout () {
    userService.logout()
    this.context.router.history.push('/')
  }

  render () {
    const button = (
      <button
        className='nav-item logout btn btn-outline-light'
        onClick={this.logout.bind(this)}
      >
        <i className='fa fa-sign-out' /> Log Out
      </button>)

    const usersToFollow = <Link className='nav-item nav-link mr-3' to='/findUsers'>Follow users</Link>

    return (
      <nav className='navbar navbar-expand navbar-dark bg-primary fixed-top'>
        <Link to='/' className='navbar-brand'>OpenChat</Link>

        <div className='navbar-nav ml-auto'>
          {userService.user ? usersToFollow : null}
          {userService.user ? button : null}
        </div>
      </nav>
    )
  }
}

export default Header
