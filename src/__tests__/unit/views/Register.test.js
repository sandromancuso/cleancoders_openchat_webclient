import { Link } from 'react-router-dom'
import Register from 'views/Register'
import userService from 'services/User'
import showError from 'utils/showError'
jest.mock('utils/showError')

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
    wrapper = shallow(<Register />, { context }).setState(state)
  }
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
    showError.mockClear()
    const anError = new Error('some register error')
    userService.register = jest.fn(() => Promise.reject(anError))

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )
    await flushPromises()

    expect(userService.register).toHaveBeenCalledWith(state)
    expect(showError).toHaveBeenCalledWith(anError)
  })

  it('links to login', () => {
    const link = wrapper.find(Link)

    expect(link.prop('to')).toBe('/login/')
  })
})
