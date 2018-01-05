import React from 'react'
import { shallow } from 'enzyme'
import Header from 'components/Header'
import userService from 'services/User'
import User from 'domain/User'

const aUser = new User({ id: 'some id', name: 'some name', about: 'about him' })
const router = createMockRouter()
const context = { router }

describe('Header', () => {
  let wrapper

  beforeEach(() => {
    userService.user = aUser
    wrapper = shallow(<Header />, { context })
  })

  it('has the logout when the user is logged', () => {
    expect(wrapper.find('.logout')).toHaveLength(1)
  })

  it('does not have the logout when the user is not logged', () => {
    userService.user = null
    wrapper = shallow(<Header />, { context })

    expect(wrapper.find('.logout')).toHaveLength(0)
  })

  it('logs out', () => {
    expect(wrapper.find('.logout')).toHaveLength(1)
  })

})
