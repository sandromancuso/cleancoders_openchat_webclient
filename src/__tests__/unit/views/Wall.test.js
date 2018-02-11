import { Link } from 'react-router-dom'
import userService from 'services/User'
import postService from 'services/Post'
import Wall from 'views/Wall'
import Post from 'components/Post'
import PostCreator from 'components/PostCreator'
import { aUser, anotherUser, somePosts } from 'testFixtures'

const router = createMockRouter()
const context = { router }

describe('Wall', () => {
  let wrapper

  beforeEach(() => {
    userService.user = aUser
    userService.isFollowee = jest.fn(() => Promise.resolve(false))
    userService.follow = jest.fn()
    postService.getWallOfUser = jest.fn(() => Promise.resolve(somePosts))
  })

  describe('being of its own user', () => {
    beforeEach(async () => {
      userService.findById = jest.fn(() => Promise.resolve(aUser))
      wrapper = shallow(<Wall />, { context })
      await flushPromises()
      wrapper.update()
    })

    it('can create posts', () => {
      expect(wrapper.find(PostCreator)).toHaveLength(1)
    })

    it('shows the title', () => {
      const title = wrapper.find('h2')

      expect(title.text()).toBe(`Your wall, ${aUser.name}`)
    })

    it('shows the wall of posts of the user', () => {
      const posts = wrapper.find(Post)

      expect(postService.getWallOfUser).toHaveBeenCalledWith(aUser.id)
      expect(posts).toHaveLength(somePosts.length)
    })

    it('links to its timeline', () => {
      const link = wrapper.find(Link)

      expect(link.prop('to')).toBe('/timeline/')
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
      wrapper = shallow(<Wall />, { context }).setProps({match})
      await flushPromises()
      wrapper.update()
    })

    it('displays the posts', () => {
      const posts = wrapper.find(Post)

      expect(postService.getWallOfUser).toHaveBeenCalledWith(match.params.id)
      expect(posts).toHaveLength(somePosts.length)
    })

    it('shows the user name', () => {
      const userName = wrapper.find('h2')

      expect(userName.text()).toBe(`${anotherUser.name}'s wall`)
    })

    it('cannot create posts', () => {
      expect(wrapper.find(PostCreator)).toHaveLength(0)
    })

    it('links to its timeline', () => {
      const link = wrapper.find(Link)

      expect(link.prop('to')).toBe('/timeline/' + anotherUser.id)
    })

    it('shows follow button when is not a followee', () => {
      const button = wrapper.find('.follow')

      button.simulate('click')

      expect(userService.follow).toHaveBeenCalledWith(anotherUser.id)
    })
  })
})
