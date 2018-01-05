import React, { Component } from 'react'
import Post from 'components/Post'
import userService from 'services/User'
import postService from 'services/Post'

class Wall extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      list: []
    }
  }

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
    let id
    try {
      id = this.context.router.match.params.id
    }
    catch (error) {
      id = userService.user.id
    }

    const posts = await postService.getWallOfUser(id)

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
