import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import userService from 'services/User'

class FindUsersToFollow extends Component {

  state = {
    users: []
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  async followUser (id) {
    await userService.follow(id)
    const users = await userService.getUsersToFollow()
    await this.setState({ users: users })
  }

  render () {
    const displayUsers = this.state.users.map( user => (
      <div className="user card my-3" key={user.id}>
        <div className="card-header">
          <div className="row justify-content-between">
            <div className="col-6">
              <Link to={`/wall/${user.id}`}>{user.name}</Link>
            </div>
            <div className="col-6 text-right text-muted">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => this.followUser(user.id)}
              >
                <i className="fa fa-plus"></i> Follow
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          {user.about}
        </div>
      </div>
    ))

    return (
      <div className="container">
        <ul>
          {displayUsers}
        </ul>
      </div>
    )
  }

  async componentDidMount () {
    const users = await userService.getUsersToFollow()
    await this.setState({ users: users })
  }
}

export default FindUsersToFollow
