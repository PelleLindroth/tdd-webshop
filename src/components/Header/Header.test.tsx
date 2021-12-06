import { shallow } from 'enzyme'
import Header from './Header'

describe('Header', () => {
  it('renders Header component correctly', () => {
    const wrapper = shallow(<Header />)

    expect(wrapper).toMatchSnapshot()
  })
})
