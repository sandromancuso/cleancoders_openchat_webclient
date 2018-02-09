import { Link } from 'react-router-dom'
import Header from 'components/Header'
import userService from 'services/User'
import { aUser } from 'testFixtures'

const router = createMockRouter()
const context = { router }

describe('Header', () => {
  let wrapper

  beforeEach(() => {
    userService.user = aUser
    wrapper = shallow(<Header />, { context })
  })

  it('links to the home', () => {
    const link = wrapper.find(Link).first()

    expect(link.prop('to')).toBe('/')
  })

  it('has the logout when the user is logged', () => {
    userService.logout = jest.fn()
    const button = wrapper.find('.logout')

    button.simulate('click')

    expect(userService.logout).toHaveBeenCalled()
  })

  it('does not have the logout when the user is not logged', () => {
    userService.user = null
    wrapper = shallow(<Header />, { context })

    expect(wrapper.find('.logout')).toHaveLength(0)
  })

  it('logs out', () => {
    expect(wrapper.find('.logout')).toHaveLength(1)
  })

  it('allows to find users to follow', () => {
    const link = wrapper.find(Link).at(1)

    expect(link.prop('to')).toBe('/findUsers')
  })
})
