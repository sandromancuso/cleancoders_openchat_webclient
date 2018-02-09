import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => (
  <div className='card col-lg-3 col-md-5 col-sm-12 col-xs-12 m-1'>
    <div className='card-body'>
      <p className='card-title'>
        <i className='fa fa-user text-primary mr-1' />
        <Link to={`/wall/${props.user.id}`}>
          <strong>{props.user.name}</strong>
        </Link>
      </p>
      <p className='card-text'>{props.user.about}</p>
      {!props.isFollowee
        ? (<button
          className='card-link btn btn-sm btn-primary'
          onClick={props.onFollow}
          >
          <i className='fa fa-plus' /> Follow</button>
        )
        : (<span className='border rounded p-2 small'>Already following</span>)
      }
    </div>
  </div>
)
