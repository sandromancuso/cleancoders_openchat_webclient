import React from 'react'
import { shallow } from 'enzyme'
import PostComponent from 'components/Post'
import Post from 'domain/Post'

describe('Post', () => {
  it('renders', () => {
    const post = new Post({ id: 'an Id', userId: 'a user Id', text: 'Some text', date: '18/02/2018', time: '11:12:13' })
    const wrapper = shallow(<PostComponent post={post} />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
