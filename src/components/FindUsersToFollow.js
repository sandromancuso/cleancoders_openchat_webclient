import React, { Component } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert'
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
    try {
      await userService.follow(id)
      const users = await userService.getUsers()
      await this.setState({ users: users })
    }
    catch (error) {
      swal(error.name, error.message, 'error')
    }
  }

  render () {
    const displayUsers = this.state.users.map(user => (
      <UserToFollow key={user.id} user={user} following={this.following(user)} onFollow={() => this.followUser(user.id)} />
    ))

    return (
      <div className='container'>
        { this.noUsersToFollow ? 'No users to follow.' : null }
        <div className='row justify-content-md-center users-to-follow'>
          {displayUsers}
        </div>
      </div>
    )
  }

  async following (user) {
    try {
      return await userService.isFollowee(user.id)
    }
    catch (error) {
      swal(error.name, error.message, 'error')
    }
  }

  noUsersToFollow () {
    return this.state.users.length === 0
  }

  async componentDidMount () {
    try {
      let users = await userService.getUsers()
      users = users.filter(user => user.id !== userService.user.id)
      await this.setState({ users: users })
    } catch (error) {
      swal(error.name, error.message, 'error')
    }
  }
}

export default FindUsersToFollow
