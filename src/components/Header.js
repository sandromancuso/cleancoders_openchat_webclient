import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    const button = (
      <button
        className="logout btn btn-outline-light"
        onClick={this.logout.bind(this)}
      >
        <i className="fa fa-sign-out" /> Log Out
      </button>)

    const usersToFollow = <Link className="nav-link mr-3" to="/findUsers">Find users to follow</Link>

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <Link to="/" className="navbar-brand">OpenChat</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collapse justify-content-stretch" id="navbar">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {userService.user? usersToFollow : null}
            </li>
            <li className="nav-item">
              {userService.user? button : null}
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
