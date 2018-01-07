import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import Login from 'components/Login'
import userService from 'services/User'
jest.mock('sweetalert')
import swal from 'sweetalert'

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

  it('handles authentication errors', async () => {
    swal = jest.fn()
    const anError = new Error('some login error')
    userService.login = jest.fn(() => Promise.reject(anError))

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )
    await flushPromises()

    expect(userService.login).toHaveBeenCalledWith(state)
    expect(swal).toHaveBeenCalledWith('Error', anError.message, 'error')
  })

  it('links to register', () => {
    const link = wrapper.find(Link)

    expect(link.prop('to')).toBe('/register/')
  })
})
