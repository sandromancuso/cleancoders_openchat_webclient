import { Link } from 'react-router-dom'
import userService from 'services/User'
import postService from 'services/Post'
import Timeline from 'views/Timeline'
import Post from 'components/Post'
import { aUser, anotherUser, somePosts } from 'testFixtures'

const router = createMockRouter()
const context = { router }

describe('Timeline', () => {
  let wrapper

  beforeEach(() => {
    userService.user = aUser
    userService.isFollowee = jest.fn(() => Promise.resolve(false))
    userService.follow = jest.fn()
    postService.getPostsOfUser = jest.fn(() => Promise.resolve(somePosts))
  })

  describe('being of its own user', () => {
    beforeEach(async () => {
      userService.findById = jest.fn(() => Promise.resolve(aUser))
      wrapper = shallow(<Timeline />, { context })
      await flushPromises()
      wrapper.update()
    })

    it('shows the title', () => {
      const title = wrapper.find('h2')

      expect(title.text()).toBe(`Your timeline, ${aUser.name}`)
    })

    it('shows the wall of posts of the user', () => {
      const posts = wrapper.find(Post)

      expect(postService.getPostsOfUser).toHaveBeenCalledWith(aUser.id)
      expect(posts).toHaveLength(somePosts.length)
    })

    it('links to its wall', () => {
      const link = wrapper.find(Link)

      expect(link.prop('to')).toBe('/wall/')
    })
  })

  describe('using the id of another user in the route', () => {
    let match

    beforeEach(async () => {
      userService.findById = jest.fn(() => Promise.resolve(anotherUser))
      match = {
        params: {
          id: anotherUser.id
        }
      }
      wrapper = shallow(<Timeline />, { context }).setProps({match})
      await flushPromises()
      wrapper.update()
    })

    it('displays the posts', () => {
      const posts = wrapper.find(Post)

      expect(postService.getPostsOfUser).toHaveBeenCalledWith(match.params.id)
      expect(posts).toHaveLength(somePosts.length)
    })

    it('shows the user name', () => {
      const userName = wrapper.find('h2')

      expect(userName.text()).toBe(`${anotherUser.name}'s timeline`)
    })

    it('links to its wall', () => {
      const link = wrapper.find(Link)

      expect(link.prop('to')).toBe('/wall/' + anotherUser.id)
    })

    it('shows follow button when is not a followee', () => {
      const button = wrapper.find('.follow')

      button.simulate('click')

      expect(userService.follow).toHaveBeenCalledWith(anotherUser.id)
    })
  })
})
