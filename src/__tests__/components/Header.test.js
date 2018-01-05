import React from 'react'
import { shallow } from 'enzyme'
import Header from 'components/Header'

describe('Header', () => {
  it('renders', () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
