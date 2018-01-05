import React from 'react'
import { shallow } from 'enzyme'
import Post from 'components/Post'
import { aPost } from 'testFixtures'

describe('Post', () => {
  it('renders', () => {
    const wrapper = shallow(<Post post={aPost} />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
