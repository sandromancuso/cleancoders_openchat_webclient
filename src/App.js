import React, { Component } from 'react'
import 'App.css'
import { BrowserRouter } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Router from 'router'

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <main role="main" className="main">
          <Router></Router>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
    )
  }
}

export default App
