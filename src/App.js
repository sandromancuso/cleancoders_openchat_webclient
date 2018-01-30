import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Router from 'router'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Header />
          <main role='main' className='main'>
            <Router />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
