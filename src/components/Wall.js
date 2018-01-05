import React, { Component } from 'react'
import Post from 'components/Post'
import userService from 'services/User'
import postService from 'services/Post'

class Wall extends Component {
  state = {
    posts: []
  }

  posts() {
    return this.state.posts.map( post => <Post key={post.id} post={post} /> )
  }

  render () {
    return (
      <div className="container">
        {this.posts()}
      </div>
    )
  }

  async componentWillMount() {
    const posts = await postService.getWallOfUser(userService.user.id)

    this.setState({
      posts: posts
    })
  }
}

export default Wall
