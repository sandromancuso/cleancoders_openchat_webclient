import React, { Component } from 'react'
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
          <PostCreator /> :
          null
        }
        {this.list()}
      </div>
    )
  }

  async setList () {
    const posts = await postService.getWallOfUser(this.state.user.id)

    const list = await Promise.all(
      posts.map( async post => {
        const user = await userService.findById(post.userId)
        return { post, user }
      })
    )

    await this.setState({ list: list })
  }

  async componentWillMount () {
    await this.setState({ user: userService.user })
    await this.setList()
  }

  async componentWillReceiveProps (props) {
    const id = props.match.params.id
    if (this.state.user.id === id) return null

    const user = id ?
      await userService.findById(id) :
      userService.user
    await this.setState({ user: user })
    await this.setList()
  }
}

export default Wall
