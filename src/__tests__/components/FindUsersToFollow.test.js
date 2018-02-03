import React from 'react'
import { shallow } from 'enzyme'
import userService from 'services/User'
import FindUsersToFollow from 'components/FindUsersToFollow'
import { aUser, someUsers } from 'testFixtures'
import UserToFollow from 'components/UserToFollow'

const router = createMockRouter()
const context = { router }

describe('FindUsersToFollow', () => {
  let wrapper

  beforeEach(async () => {
    userService.user = aUser
    userService.follow = jest.fn()
    userService.getUsersToFollow = jest.fn(() => Promise.resolve(someUsers))
    wrapper = shallow(<FindUsersToFollow />, { context })
    await flushPromises()
    wrapper.update()
  })

  it('shows the users to follow', () => {
    const users = wrapper.find(UserToFollow)

    expect(users).toHaveLength(someUsers.length)
  })

  it('allows to follow users', () => {
    const user = wrapper.find(UserToFollow).at(0)
    const onFollow = user.prop('onFollow')

    onFollow()

    expect(userService.follow).toHaveBeenCalledWith(aUser.id)
  })
})
