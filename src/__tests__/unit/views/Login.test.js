import { Link } from 'react-router-dom'
import Login from 'views/Login'
import userService from 'services/User'
import showError from 'utils/showError'
jest.mock('utils/showError')

const state = {
  userName: 'aUserName',
  password: 'aPassword'
}

const router = createMockRouter()
const context = { router }

describe('Login', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Login />, { context }).setState(state)
  })

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
    showError.mockClear()
    const anError = new Error('some login error')
    userService.login = jest.fn(() => Promise.reject(anError))

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )
    await flushPromises()

    expect(userService.login).toHaveBeenCalledWith(state)
    expect(showError).toHaveBeenCalledWith(anError)
  })

  it('links to register', () => {
    const link = wrapper.find(Link)

    expect(link.prop('to')).toBe('/register/')
  })
})
