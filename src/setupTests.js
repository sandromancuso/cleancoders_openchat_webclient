import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.flushPromises = () => new Promise(resolve => setImmediate(resolve))

global.createMockRouter = () => ({
  history: {
    push: jest.fn()
  }
})
