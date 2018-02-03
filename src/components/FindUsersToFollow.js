import React, { Component } from 'react'
import PropTypes from 'prop-types'
import userService from 'services/User'
import UserToFollow from 'components/UserToFollow'

class FindUsersToFollow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
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
    const displayUsers = this.state.users.map(user => (
      <UserToFollow key={user.id} user={user} onFollow={() => this.followUser(user.id)} />
    ))

    return (
      <div className='container'>
        <div className='row justify-content-md-center users-to-follow'>
          {displayUsers}
        </div>
      </div>
    )
  }

  async componentDidMount () {
    const users = await userService.getUsersToFollow()
    await this.setState({ users: users })
  }
}

export default FindUsersToFollow
