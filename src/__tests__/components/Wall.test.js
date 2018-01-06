import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import userService from 'services/User'
import postService from 'services/Post'
import Wall from 'components/Wall'
import Post from 'components/Post'
import PostCreator from 'components/PostCreator'
import { aUser, anotherUser, somePosts } from 'testFixtures'

const router = createMockRouter()
const context = { router }

describe('Wall', () => {
  describe('being of its own user', () => {
    let wrapper

    beforeEach( async () => {
      userService.user = aUser
      postService.getWallOfUser = jest.fn( () => Promise.resolve(somePosts) )
      userService.findById = jest.fn( () => Promise.resolve(aUser) )
      wrapper = shallow(<Wall/>, { context })
      await flushPromises()
      wrapper.update()
    })

    it('can create posts', () => {
      expect(wrapper.find(PostCreator)).toHaveLength(1)
    })

    it('shows the wall of posts of the user', () => {
      const posts = wrapper.find(Post)
      const userName = wrapper.find('h2')

      expect(postService.getWallOfUser).toHaveBeenCalledWith(aUser.id)
      expect(posts).toHaveLength(somePosts.length)
      expect(userName.text()).toBe('Your wall')
    })

    it('links to its profile', () => {
      const link = wrapper.find(Link)

      expect(link.prop('to')).toBe('/profile/')
    })
  })

  describe('using the id of another user in the route', () => {
    let wrapper
    let match

    beforeEach( async () => {
      userService.user = aUser
      postService.getWallOfUser = jest.fn( () => Promise.resolve(somePosts) )
      userService.findById = jest.fn( () => Promise.resolve(anotherUser) )
      match = {
        params: {
          id: anotherUser.id
        }
      }
      wrapper = shallow(<Wall/>, { context }).setProps({match})
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

    it('links to its profile', () => {
      const link = wrapper.find(Link)

      expect(link.prop('to')).toBe('/profile/' + anotherUser.id)
    })
  })
})
