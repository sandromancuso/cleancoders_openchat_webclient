import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import userService from 'services/User'

const Post = ({ post, user }) => {

  const isOwnPost = user.id === userService.user.id

  return (
    <div className="card my-3">
      <div className="card-header">
        <div className="row justify-content-between">
          <div className="col-6">
            {isOwnPost ?
              <Link to='/wall'>You</Link> :
              <Link to={`/wall/${user.id}`}>{user.name}</Link>
            }
          </div>
          <div className="col-6 text-right text-muted">
            Posted on {post.date} at {post.time}
          </div>
        </div>
      </div>
      <div className="card-body">
        {post.text}
      </div>
    </div>
  )
}

Post.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Post
