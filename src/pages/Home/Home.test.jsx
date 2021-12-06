import { shallow } from 'enzyme'
import { render, screen } from '@testing-library/react'
import Home from './Home'
import { productsDb } from '../../mocks/products'

describe('Home', () => {
  it('renders Home component correctly', () => {
    const wrapper = shallow(<Home products={productsDb} />)

    expect(wrapper).toMatchSnapshot()
  }),
    it('renders a list of 6 products', () => {
      render(<Home products={productsDb} />)
      const products = screen.getAllByRole('listitem')
      expect(products).toHaveLength(6)
    }),
    it('shows an error message if products is empty', () => {
      render(<Home products={[]} />)

      const message = screen.getByText('Something went wrong')
      expect(message).toBeInTheDocument()
    }),
    it('renders an empty input field', () => {
      render(<Home products={productsDb} />)
      const input = screen.getByRole('searchbox')
      expect(input).toHaveTextContent('')
    })
})

// if product array has a  length products are shown in a grid

// if product array has no length (server error) a message is shown to the user

// it renders an empty input field at the start

// it shows correct filtered products when searching by product name

// if there are no matching searches the message no matching products is shown to the user
