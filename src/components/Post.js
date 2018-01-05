import React from 'react'

const Post = ({ post, user }) => {

  return (
    <div className="card my-3">
      <div className="card-header">
        <div className="row justify-content-between">
          <div className="col-6">
            {user.name}
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

export default Post
