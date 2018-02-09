import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Serializer from 'jest-serializer-html'
import { shallow, render } from 'enzyme'

configure({ adapter: new Adapter() })

expect.addSnapshotSerializer(Serializer)

global.React = React
global.shallow = shallow
global.render = render

global.flushPromises = () => new Promise(resolve => setImmediate(resolve))

global.createMockRouter = () => ({
  history: {
    push: jest.fn()
  }
})

global.localStorage = {
  clear: jest.fn(),
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}
