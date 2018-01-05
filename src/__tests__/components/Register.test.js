import React from 'react'
import { shallow } from 'enzyme'
import Register from 'components/Register'
import userService from 'services/User'

const state = {
  userName: 'aUserName',
  password: 'aPassword',
  about: 'some text'
}

const router = createMockRouter()
const context = { router }

describe('Register', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Register/>, { context }).setState(state) }
  )

  it('registers user', async () => {
    userService.register = jest.fn(() => Promise.resolve())

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )

    await flushPromises()

    expect(userService.register).toHaveBeenCalledWith(state)
    expect(router.history.push).toHaveBeenCalledWith('/')
  })
})
