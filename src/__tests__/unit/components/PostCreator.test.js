import PostCreator from 'components/PostCreator'
import userService from 'services/User'
import postService from 'services/Post'
import { aUser } from 'testFixtures'
import showError from 'utils/showError'
jest.mock('utils/showError')

const state = {
  text: 'someText'
}

const router = createMockRouter()
const context = { router }

describe('PostCreator', () => {
  let wrapper

  beforeEach(() => {
    userService.user = aUser
  })

  it('creates a post', async () => {
    postService.createPostByUser = jest.fn(() => Promise.resolve())
    wrapper = shallow(<PostCreator />, { context }).setState(state)

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )
    await flushPromises()

    expect(postService.createPostByUser).toHaveBeenCalledWith(aUser.id, state.text)
    expect(router.history.push).toHaveBeenCalledWith('/')
  })

  it('handles posting errors', async () => {
    showError.mockClear()
    const anError = new Error('Some posting error')
    postService.createPostByUser = jest.fn(() => Promise.reject(anError))
    wrapper = shallow(<PostCreator />, { context }).setState(state)

    wrapper.find('form').simulate('submit',
      { preventDefault: () => {} }
    )
    await flushPromises()

    expect(postService.createPostByUser).toHaveBeenCalledWith(aUser.id, state.text)
    expect(showError).toHaveBeenCalledWith(anError)
  })
})
