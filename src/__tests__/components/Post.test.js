import React from 'react'
import { shallow } from 'enzyme'
import Post from 'components/Post'
import { aPost, aUser } from 'testFixtures'

describe('Post', () => {
  it('renders', () => {
    const wrapper = shallow(<Post post={aPost} user={aUser} />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
