import { shallow } from 'enzyme'
import Cart from './Cart'

describe('Cart', () => {
  it('shallow renders Cart component correctly', () => {
    const wrapper = shallow(<Cart />)

    expect(wrapper).toMatchSnapshot()
  })
})
