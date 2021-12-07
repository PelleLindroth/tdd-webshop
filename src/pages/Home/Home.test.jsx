import { shallow } from 'enzyme'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'
import { productsDb } from '../../mocks/products'
import { renderWithRouter } from '../../testing-utils'

describe('Home', () => {
  it('renders Home component correctly', () => {
    const wrapper = shallow(<Home products={productsDb} />)

    expect(wrapper).toMatchSnapshot()
  })
  it('renders a list of 6 products', () => {
    renderWithRouter(<Home products={productsDb} />)
    const products = screen.getAllByRole('listitem')
    expect(products).toHaveLength(6)
  })
  it('shows an error message if products is empty', () => {
    render(<Home products={[]} />)

    const message = screen.getByText('Something went wrong')
    expect(message).toBeInTheDocument()
  })
  it('renders an empty input field', () => {
    renderWithRouter(<Home products={productsDb} />)
    const input = screen.getByRole('searchbox')
    expect(input).toHaveTextContent('')
  })
  it('shows correct filtered products when searching by product name', () => {
    renderWithRouter(<Home products={productsDb} />)
    const input = screen.getByRole('searchbox')

    const filteredProducts = screen.getAllByRole('listitem')

    expect(filteredProducts).toHaveLength(6)

    userEvent.type(input, 'book')

    const newlyFilteredProducts = screen.getAllByRole('listitem')

    expect(newlyFilteredProducts).toHaveLength(1)
  })
  it('shows no filtered products if search doesnt match', () => {
    renderWithRouter(<Home products={productsDb} />)
    const input = screen.getByRole('searchbox')

    const filteredProducts = screen.getAllByRole('listitem')

    expect(filteredProducts).toHaveLength(6)

    userEvent.type(input, 'kljhter4k')

    const disappearedProducts = screen.queryAllByRole('listitem')

    expect(disappearedProducts).toHaveLength(0)
  })
  it('shows message if no products match search', () => {
    renderWithRouter(<Home products={productsDb} />)
    const input = screen.getByRole('searchbox')

    userEvent.type(input, 'kljhter4k')

    const message = screen.getByText(/no matching products/i)

    expect(message).toBeInTheDocument()
  })
})
