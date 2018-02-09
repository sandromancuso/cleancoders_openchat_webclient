import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer className='footer text-muted'>
        <div className='container'>
          <div className='row'>
            <div className='col mr-auto'>
              <a href='https://codurance.com/' target='_blank' rel='noopener noreferrer'>
                Powered by Codurance.com
              </a>
            </div>
            <div className='col text-right'>
              Crafted with <i className='fa fa-heart text-danger' />
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
