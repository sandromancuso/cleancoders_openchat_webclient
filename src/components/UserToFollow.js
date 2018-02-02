import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => (
  <div className='card col-lg-3 col-sm-1 user-to-follow'>
    <div className='card-body'>
      <p className='card-title'><i className='fa fa-user' /><Link to={`/wall/${props.user.id}`}>{props.user.name}</Link></p>
      <p className='card-text'>{props.user.about}</p>
      <button
        className='card-link btn btn-sm btn-primary'
        onClick={props.onClick}
                >
        <i className='fa fa-plus' /> Follow
            </button>
    </div>
  </div>
)
