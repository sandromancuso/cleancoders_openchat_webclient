import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import Post from 'components/Post'
import { aPost, aUser } from 'testFixtures'

const router = createMockRouter()
const context = { router }

describe('Post', () => {
  it('displays link and data', () => {
    const wrapper = shallow(<Post post={aPost} user={aUser} />, { context })
    const link = wrapper.find(Link)

    expect(link).toHaveLength(1)
    expect(link.prop('to')).toEqual(`/wall/${aUser.id}`)
    expect(wrapper.text().includes(aPost.text)).toBe(true)
    expect(wrapper.text().includes(aPost.date)).toBe(true)
    expect(wrapper.text().includes(aPost.time)).toBe(true)
  })
})
