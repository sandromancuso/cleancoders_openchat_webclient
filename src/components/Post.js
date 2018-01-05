import React from 'react'

const Post = ({ post }) => {
  return (
    <div className="row justify-content-md-center bg-light border rounded my-2 py-2">
      <div className="col-sm-8">
        {post.text}
      </div>
      <div className="col-sm-4 text-right">
        <span className="font-italic">Posted on {post.date} at {post.time}</span>
      </div>
    </div>
  )
}

export default Post
