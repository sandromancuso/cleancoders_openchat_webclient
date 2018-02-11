import React, { Component } from 'react'
import PropTypes from 'prop-types'
import showError from 'utils/showError'
import { Link } from 'react-router-dom'
import Post from 'components/Post'
import PostCreator from 'components/PostCreator'
import userService from 'services/User'
import postService from 'services/Post'

class Wall extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      user: {},
      list: [],
      showFollow: false
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  list () {
    return this.state.list.map(({ post, user }) => <Post key={post.id} post={post} user={user} />)
  }

  isOwnWall () {
    return this.state.user.id === userService.user.id
  }

  async follow () {
    await userService.follow(this.state.user.id)
    this.setState({ showFollow: false })
  }

  followButton () {
    if (this.isOwnWall()) return null

    return this.state.showFollow
    ? (<button className='btn btn-md btn-primary follow' onClick={() => this.follow()}>
      <i className='fa fa-plus' /> Follow
    </button>)
    : 'Following'
  }

  render () {
    return (
      <div className='container'>
        <h2>
          {this.isOwnWall()
            ? `Your wall, ${this.state.user.name}`
            : `${this.state.user.name}'s wall`
          }
        </h2>
        <div className='row'>
          <div className='col-sm-10'>
            {this.isOwnWall()
              ? <Link to={`/timeline/`}>See timeline</Link>
              : <Link to={`/timeline/${this.state.user.id}`}>See {this.state.user.name}'s timeline</Link>
            }
          </div>
          <div className='col-sm-2 text-right'>
            {this.followButton()}
          </div>
        </div>
        <hr />
        {this.isOwnWall() ? (
          <div className='row'>
            <PostCreator />
          </div>)
            : null
        }
        {this.list()}
      </div>
    )
  }

  async buildState (user) {
    this.setState({ user: user })

    const posts = await postService.getWallOfUser(user.id)
    const list = await Promise.all(
      posts.map(async post => {
        const user = await userService.findById(post.userId)
        return { post, user }
      })
    )
    this.setState({ list: list })

    const showFollow = !this.isOwnWall() && !await userService.isFollowee(user.id)
    this.setState({ showFollow: showFollow })
  }

  getIdFromProps (props) {
    try {
      return props.match.params.id
    } catch (error) {
      return false
    }
  }

  async componentDidMount () {
    try {
      const id = this.getIdFromProps(this.props)
      const user = id
        ? await userService.findById(id)
        : userService.user

      await this.buildState(user)
    } catch (error) {
      showError(error)
    }
  }

  async componentWillReceiveProps (props) {
    try {
      const id = this.getIdFromProps(props)
      const user = id
        ? await userService.findById(id)
        : userService.user

      await this.buildState(user)
    } catch (error) {
      showError(error)
    }
  }
}

export default Wall
