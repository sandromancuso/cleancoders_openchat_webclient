import userService from 'services/User'
import FindUsersToFollow from 'views/FindUsersToFollow'
import { aUser, anotherUser, someUsers } from 'testFixtures'
import UserToFollow from 'components/UserToFollow'

const router = createMockRouter()
const context = { router }

describe('FindUsersToFollow', () => {
  let wrapper

  beforeEach(async () => {
    userService.user = aUser
    userService.follow = jest.fn()
    userService.getUsers = jest.fn(() => Promise.resolve(someUsers))
    userService.getFollowees = jest.fn(() => Promise.resolve(anotherUser))
    wrapper = shallow(<FindUsersToFollow />, { context })
    await flushPromises()
    wrapper.update()
  })

  it('shows the users to follow', () => {
    const users = wrapper.find(UserToFollow)
    const myself = 1

    expect(users.length).toBe(someUsers.length - myself)
  })

  it('allows to follow users', () => {
    const user = wrapper.find(UserToFollow).first()
    const onFollow = user.prop('onFollow')

    onFollow()

    expect(userService.follow).toHaveBeenCalledWith(anotherUser.id)
  })
})
