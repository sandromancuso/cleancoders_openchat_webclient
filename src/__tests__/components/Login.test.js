import React from 'react'
import { shallow } from 'enzyme'
import Login from 'components/Login'
import userService from 'services/User'

const state = {
  userName: 'aUserName',
  password: 'aPassword'
}

const router = createMockRouter()
const context = { router }

describe('Login', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Login/>, { context }).setState(state) }
  )

  it('authenticates the user', async () => {
    userService.login = jest.fn(() => Promise.resolve())

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )

    await flushPromises()

    expect(userService.login).toHaveBeenCalledWith(state)
    expect(router.history.push).toHaveBeenCalledWith('/')
  })
})
