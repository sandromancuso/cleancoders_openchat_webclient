import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import userService from 'services/User'
import TimeAgo from 'timeago-react'

const Post = ({ post, user }) => {
  const isOwnPost = user.id === userService.user.id
  return (
    <div className='post media my-3'>
      <div className='media-body'>
        <p className='mt-0 post-header'>{isOwnPost
              ? <Link to='/wall'>You</Link>
              : <Link to={`/wall/${user.id}`}>{user.name}</Link>
            } - <TimeAgo
              datetime={post.dateTime}
              locale='en_UK'
                />
        </p>
        <span className='post-text'>{post.text}</span>
      </div>
    </div>
  )
}

Post.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Post
