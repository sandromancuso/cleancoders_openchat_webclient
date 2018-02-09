import React, { Component } from 'react'
import showError from 'utils/showError'
import PropTypes from 'prop-types'
import userService from 'services/User'
import postService from 'services/Post'

class PostCreator extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      text: ''
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  async handleSubmit (event) {
    event.preventDefault()
    try {
      await postService.createPostByUser(userService.user.id, this.state.text)
      this.setState({ text: '' })
      this.context.router.history.push('/')
    } catch (error) {
      showError(error)
    }
  }

  render () {
    return (
      <div className='container'>
        <form className='bg-light border rounded'
          onSubmit={this.handleSubmit.bind(this)}
          >
          <div className='row align-items-center justify-content-md-center m-1'>
            <div className='col col-lg-10 col-sm-12'>
              <label htmlFor='createPost' className='sr-only'>Create a Post</label>
              <textarea
                id='createPost'
                className='form-control my-2'
                placeholder="What's happening?"
                required
                value={this.state.text}
                onChange={(event) => {
                  this.setState({
                    text: event.target.value
                  })
                }}
              />
            </div>

            <div className='col col-lg-2'>
              <button className='btn btn-sm btn-primary btn-block' type='submit'>
                <i className='fa fa-comment-o' /> Create Post
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default PostCreator
