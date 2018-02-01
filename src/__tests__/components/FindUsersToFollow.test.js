import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import userService from 'services/User'
import FindUsersToFollow from 'components/FindUsersToFollow'
import { aUser, someUsers } from 'testFixtures'
import UserToFollow from '../../components/UserToFollow';

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
    const link = users.first().shallow().find(Link).at(0)

    expect(users).toHaveLength(someUsers.length)
    expect(link.prop('to')).toBe('/wall/' + someUsers[0].id)
    expect(link.children().text()).toBe(someUsers[0].name)
  })

  it('allows to follow users', () => {
    const userToFollow = wrapper.find(UserToFollow).at(0)
    const followButton = userToFollow.shallow().find('.btn');
  
    followButton.simulate('click')

    expect(userService.follow).toHaveBeenCalledWith(someUsers[0].id)
  })
})
