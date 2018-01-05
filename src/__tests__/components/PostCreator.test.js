import React from 'react'
import { shallow } from 'enzyme'
import PostCreator from 'components/PostCreator'
import userService from 'services/User'
import postService from 'services/Post'
import { aUser } from 'testFixtures'

const state = {
  text: 'someText'
}

const router = createMockRouter()
const context = { router }

describe('PostCreator', () => {
  let wrapper

  beforeEach(() => {
    userService.user = aUser
    postService.createPostByUser = jest.fn()
    wrapper = shallow(<PostCreator/>, { context }).setState(state) }
  )

  it('creates a post', async () => {
    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )

    await flushPromises()

    expect(postService.createPostByUser).toHaveBeenCalledWith(aUser.id, state.text)
    expect(router.history.push).toHaveBeenCalledWith('/')
  })
})
