import React from 'react'
import { shallow } from 'enzyme'
import Profile from 'components/Profile'
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

describe('Profile', () => {
  let wrapper

  beforeEach(async () => {
    userService.user = aUser
    postService.getPostsOfUser = jest.fn( () => Promise.resolve(somePosts) )
  })

  it('shows the posts of the user', async () => {
    wrapper = shallow(<Profile/>)
    await flushPromises()
    wrapper.update()

    const posts = wrapper.find(Post)

    expect(postService.getPostsOfUser).toHaveBeenCalledWith(aUser.id)
    expect(posts).toHaveLength(somePosts.length)
  })

  it('uses the id in the route', async () => {
    wrapper = shallow(<Profile/>, { context })
    await flushPromises()

    expect(postService.getPostsOfUser).toHaveBeenCalledWith(router.match.params.id)
  })
})
