import { shallow } from 'enzyme'
import Home from './Home'

describe('Home', () => {
  it('renders Home component correctly', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper).toMatchSnapshot()
  })
})
