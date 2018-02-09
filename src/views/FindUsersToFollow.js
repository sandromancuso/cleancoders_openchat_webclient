import React, { Component } from 'react'
import PropTypes from 'prop-types'
import showError from 'utils/showError'
import userService from 'services/User'
import UserToFollow from 'components/UserToFollow'

class FindUsersToFollow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      followees: []
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render () {
    const displayUsers = this.state.users.map(user => (
      <UserToFollow
        key={user.id}
        user={user}
        isFollowee={this.isFollowee(user.id)}
        onFollow={() => this.followUser(user.id)}
      />
    ))

    return (
      <div className='container'>
        { this.noUsersToFollow()
          ? <h4 className='m-0 alert alert-secondary p-4 text-center'>There are no users to follow.</h4>
          : (<div className='row justify-content-md-center users-to-follow'>
            {displayUsers}
          </div>)
        }
      </div>
    )
  }

  isFollowee (id) {
    return this.state.followees.some(user => user.id === id)
  }

  async followUser (id) {
    try {
      await userService.follow(id)
      await this.updateFollowees()
    } catch (error) {
      showError(error)
    }
  }

  async updateUsers () {
    try {
      let users = await userService.getUsers()
      users = users.filter(user => user.id !== userService.user.id)
      this.setState({ users })
    } catch (error) {
      showError(error)
    }
  }

  async updateFollowees () {
    try {
      const followees = await userService.getFollowees()
      this.setState({ followees })
    } catch (error) {
      showError(error)
    }
  }

  noUsersToFollow () {
    return this.state.users.length === 0
  }

  sortUsers () {
    const users = this.state.users.sort(user => this.isFollowee(user.id) ? 1 : -1)
    this.setState({ users })
  }

  async componentDidMount () {
    await this.updateUsers()
    await this.updateFollowees()
    this.sortUsers()
  }
}

export default FindUsersToFollow
