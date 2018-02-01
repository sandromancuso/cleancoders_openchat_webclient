import React from "react"
import { Link } from 'react-router-dom'

export default (props) => (
    <div className='user card my-3'>
        <div className='card-header'>
            <div className='row justify-content-between'>
                <div className='col-6'>
                    <Link to={`/wall/${props.user.id}`}>{props.user.name}</Link>
                </div>
                <div className='col-6 text-right text-muted'>
                    <button
                    className='btn btn-sm btn-primary'
                    onClick={props.onClick}
                    >
                        <i className='fa fa-plus' /> Follow
                    </button>
                </div>
            </div>
        </div>
        <div className='card-body'>
            {props.user.about}
        </div>
    </div>
)