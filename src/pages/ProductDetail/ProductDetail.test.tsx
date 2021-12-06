import { shallow } from 'enzyme'
import ProductDetail from './ProductDetail'

describe('ProductDetail', () => {
  it('renders ProductDetail component correctly', () => {
    const wrapper = shallow(<ProductDetail />)

    expect(wrapper).toMatchSnapshot()
  })
})
