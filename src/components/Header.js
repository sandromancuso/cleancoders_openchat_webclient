import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/">OpenChat</a>
      </nav>
    )
  }
}

export default Header
