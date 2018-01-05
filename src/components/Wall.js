import React, { Component } from 'react'
import Post from 'components/Post'
import userService from 'services/User'
import postService from 'services/Post'

class Wall extends Component {
  state = { list: [] }

  list() {
    return this.state.list.map( ({ post, user }) => <Post key={post.id} post={post} user={user}/>)
  }

  render () {
    return (
      <div className="container">
        {this.list()}
      </div>
    )
  }

  async componentDidMount() {
    const posts = await postService.getWallOfUser(userService.user.id)

    const list = await Promise.all(
      posts.map( async post => {
        const user = await userService.findById(post.userId)
        return { post, user }
      })
    )

    this.setState({ list })
  }
}

export default Wall
