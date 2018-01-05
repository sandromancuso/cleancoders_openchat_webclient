import React from 'react'
import { shallow } from 'enzyme'
import App from 'App'
import Login from 'components/Login'

describe('App', () => {
  let wrapper

  beforeEach( async () => {
    wrapper = shallow(<App />)
  })

  it('shows the login when not logged in', () => {
    expect(wrapper.find(Login)).toBeDefined()
  })

  it('shows the user wall', () => {

  })
})
