import { shallow } from 'enzyme'
import Login from './Login'

describe('Login', () => {
  it('renders Login component correctly', () => {
    const wrapper = shallow(<Login />)

    expect(wrapper).toMatchSnapshot()
  })
})
