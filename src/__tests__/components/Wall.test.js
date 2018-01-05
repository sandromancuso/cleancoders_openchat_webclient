import React from 'react'
import { shallow } from 'enzyme'
import Wall from 'components/Wall'
import userService from 'services/User'
import postService from 'services/Post'
import Post from 'components/Post'
import { aUser, somePosts } from 'testFixtures'

const router = createMockRouter()
const context = { router }

describe('Wall', () => {
  let wrapper

  beforeEach(async () => {
    userService.user = aUser
    postService.getWallOfUser = jest.fn( () => Promise.resolve(somePosts) )
    wrapper = shallow(<Wall/>, { context })
    await flushPromises()
    wrapper.update()
  })

  it('shows the wall of posts of the user', async () => {
    const posts = wrapper.find(Post)

    expect(posts).toHaveLength(somePosts.length)
  })
})
