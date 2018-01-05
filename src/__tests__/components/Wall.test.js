import React from 'react'
import { shallow } from 'enzyme'
import Wall from 'components/Wall'
import userService from 'services/User'
import postService from 'services/Post'
import Post from 'components/Post'
import { aUser, somePosts } from 'testFixtures'

const router = createMockRouter()
router.match = {
  params: {
    id: 'some params by id'
  }
}
const context = { router }

describe('Wall', () => {
  let wrapper

  beforeEach(async () => {
    userService.user = aUser
    postService.getWallOfUser = jest.fn( () => Promise.resolve(somePosts) )
  })

  it('shows the wall of posts of the user', async () => {
    wrapper = shallow(<Wall/>)
    await flushPromises()
    wrapper.update()

    const posts = wrapper.find(Post)

    expect(postService.getWallOfUser).toHaveBeenCalledWith(aUser.id)
    expect(posts).toHaveLength(somePosts.length)
  })

  it('uses the id in the route', async () => {
    wrapper = shallow(<Wall/>, { context })
    await flushPromises()

    expect(postService.getWallOfUser).toHaveBeenCalledWith(router.match.params.id)
  })
})
