import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import Register from 'components/Register'
import userService from 'services/User'
jest.mock('sweetalert')
import swal from 'sweetalert'

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

  it('registers the user', async () => {
    userService.register = jest.fn(() => Promise.resolve())

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )
    await flushPromises()

    expect(userService.register).toHaveBeenCalledWith(state)
    expect(router.history.push).toHaveBeenCalledWith('/')
  })

  it('handles authentication errors', async () => {
    swal = jest.fn()
    const anError = new Error('some register error')
    userService.register = jest.fn(() => Promise.reject(anError))

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )
    await flushPromises()

    expect(userService.register).toHaveBeenCalledWith(state)
    expect(swal).toHaveBeenCalledWith('Error', anError.message, 'error')
  })

  it('links to login', () => {
    const link = wrapper.find(Link)

    expect(link.prop('to')).toBe('/login/')
  })
})
