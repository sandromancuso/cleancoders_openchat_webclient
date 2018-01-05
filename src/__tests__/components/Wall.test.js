import React from 'react'
import { shallow } from 'enzyme'
import Wall from 'components/Wall'
import userService from 'services/User'
import postService from 'services/Post'
import PostComponent from 'components/Post'
import Post from 'domain/Post'
import User from 'domain/User'

const aUser = new User({ id: 'some id', name: 'some name', about: 'about him' })
const somePosts = [
  new Post({ id: 'an Id', userId: 'a user Id', text: 'Some text', date: '18/02/2018', time: '11:12:13' }),
  new Post({ id: 'another Id', userId: 'another user Id', text: 'Some other text', date: '19/02/2017', time: '13:14:15' }),
]

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
    const posts = wrapper.find(PostComponent)

    expect(posts).toHaveLength(somePosts.length)
  })
})
