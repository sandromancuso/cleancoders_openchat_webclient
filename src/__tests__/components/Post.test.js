import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import Post from 'components/Post'
import userService from 'services/User'
import { aPost, aUser, anotherUser } from 'testFixtures'

const router = createMockRouter()
const context = { router }

describe('Post', () => {
  let wrapper

  describe('of another poster', () => {
    beforeEach( () => {
      userService.user = aUser
      wrapper = shallow(<Post post={aPost} user={anotherUser} />, { context })
    })

    it('shows wall link', () => {
      const link = wrapper.find(Link)

      expect(link.prop('to')).toEqual(`/wall/${anotherUser.id}`)
    })

    it('shows post data', () => {
      expect(wrapper.text().includes(aPost.text)).toBe(true)
      expect(wrapper.text().includes(aPost.date)).toBe(true)
      expect(wrapper.text().includes(aPost.time)).toBe(true)
    })
  })

  describe('of the own poster', () => {
    beforeEach( () => {
      userService.user = aUser
      wrapper = shallow(<Post post={aPost} user={aUser} />, { context })
    })

    it('shows wall link', () => {
      const link = wrapper.find(Link)

      expect(link.prop('to')).toEqual(`/wall`)
    })

    it('shows post data', () => {
      expect(wrapper.text().includes(aPost.text)).toBe(true)
      expect(wrapper.text().includes(aPost.date)).toBe(true)
      expect(wrapper.text().includes(aPost.time)).toBe(true)
    })
  })
})
