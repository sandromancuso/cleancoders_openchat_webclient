import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => (
  <div className='card col-lg-3 col-md-5 col-sm-12 col-xs-12 user-to-follow m-1'>
    <div className='card-body'>
      <p className='card-title mb-1'><i className='fa fa-user text-primary mr-1' /><Link to={`/wall/${props.user.id}`}>{props.user.name}</Link></p>
      <p className='card-text small'>{props.user.about}</p>
      {!props.isFollowee ?
        (<button
          className='card-link btn btn-sm btn-primary'
          onClick={props.onFollow}
          >
            <i className='fa fa-plus' /> Follow</button>
        ) :
        (<span>Already following</span>)
      }
    </div>
  </div>
)
