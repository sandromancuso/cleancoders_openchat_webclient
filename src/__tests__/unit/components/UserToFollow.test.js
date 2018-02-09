import { Link } from 'react-router-dom'
import UserToFollow from 'components/UserToFollow'
import { aUser } from 'testFixtures'

describe('UserToFollow', () => {
  let follow
  let wrapper

  beforeEach(() => {
    follow = jest.fn()
    wrapper = shallow(<UserToFollow user={aUser} onFollow={follow} />)
  })

  it('shows the user data', () => {
    const link = wrapper.find(Link)

    expect(link.prop('to')).toBe('/wall/' + aUser.id)
    expect(link.children().text()).toBe(aUser.name)
  })

  it('allows to follow users', () => {
    const followButton = wrapper.find('button')

    followButton.simulate('click')

    expect(follow).toHaveBeenCalled()
  })
})
