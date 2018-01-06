import React from 'react'
import { shallow } from 'enzyme'
import Wall from 'components/Wall'
import userService from 'services/User'
import postService from 'services/Post'
import Post from 'components/Post'
import User from 'domain/User'
import PostCreator from 'components/PostCreator'
import { aUser, anotherUser, somePosts } from 'testFixtures'

describe('Wall', () => {
  let wrapper

  beforeEach(async () => {
    userService.user = aUser
    postService.getWallOfUser = jest.fn( () => Promise.resolve(somePosts) )
    userService.findById = jest.fn( () => Promise.resolve(aUser) )
    wrapper = shallow(<Wall/>)
    await flushPromises()
    wrapper.update()
  })

  it('can create posts', async () => {
    expect(wrapper.find(PostCreator)).toHaveLength(1)
  })

  it('shows the wall of posts of the user', async () => {
    const posts = wrapper.find(Post)
    const userName = wrapper.find('h2')

    expect(postService.getWallOfUser).toHaveBeenCalledWith(aUser.id)
    expect(posts).toHaveLength(somePosts.length)
    expect(userName.text()).toBe('Your wall')
  })

  it('uses the id in the route', async () => {
    const match = {
      params: {
        id: anotherUser.id
      }
    }
    userService.findById = jest.fn( () => Promise.resolve(anotherUser) )
    wrapper.setProps({ match })
    await flushPromises()
    wrapper.update()

    const userName = wrapper.find('h2')

    expect(postService.getWallOfUser).toHaveBeenCalledWith(match.params.id)
    expect(userName.text()).toBe(`${anotherUser.name}'s wall`)
  })
})
