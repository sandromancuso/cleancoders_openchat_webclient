import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import userService from 'services/User'

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  logout() {
    userService.logout()
    this.context.router.history.push('/')
  }

  render() {
      const button = userService.user?
        (<button className="logout btn btn-outline-light" onClick={this.logout.bind(this)}>
          <i className="fa fa-sign-out" /> Log Out
        </button>) :
      null

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top justify-content-between">
        <Link to="/" className="navbar-brand">OpenChat</Link>
        {button}
      </nav>
    )
  }
}

export default Header
