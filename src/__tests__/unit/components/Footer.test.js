import Footer from 'components/Footer'

describe('Footer', () => {
  it('renders', () => {
    const wrapper = shallow(<Footer />)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
