import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Post from 'components/Post'
import PostCreator from 'components/PostCreator'
import userService from 'services/User'
import postService from 'services/Post'

class Wall extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      user: {},
      list: []
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  list () {
    return this.state.list.map( ({ post, user }) => <Post key={post.id} post={post} user={user}/>)
  }

  isOwnWall () {
    return this.state.user.id === userService.user.id
  }

  render () {
    return (
      <div className="container">
        <h2>
          {this.isOwnWall() ?
            'Your wall' :
            `${this.state.user.name}'s wall`
          }
        </h2>
        {this.isOwnWall() ?
          <Link to={`/profile/`}>See profile</Link> :
          <Link to={`/profile/${this.state.user.id}`}>See {this.state.user.name}'s profile</Link>
        }
        <hr />
        {this.isOwnWall() ?
          <PostCreator /> :
          null
        }
        {this.list()}
      </div>
    )
  }

  async setList (id) {
    const posts = await postService.getWallOfUser(id)

    const list = await Promise.all(
      posts.map( async post => {
        const user = await userService.findById(post.userId)
        return { post, user }
      })
    )

    await this.setState({ list: list })
  }

  async buildState (id) {
    const user = id ?
      await userService.findById(id) :
      userService.user
    await this.setState({ user: user })
    await this.setList(user.id)
  }

  async componentDidMount () {
    const hasParams = this.props && this.props.match && this.props.match.params
    const id = hasParams ?
      this.props.match.params.id :
      null

    await this.buildState(id)
  }

  async componentWillReceiveProps (props) {
    const id = props.match.params.id
    await this.buildState(id)
  }
}

export default Wall
