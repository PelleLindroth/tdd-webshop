import { shallow } from 'enzyme'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'
import { MemoryRouter } from 'react-router-dom'
import { productsDb } from '../../mocks/products'

describe('Home', () => {
  it('renders Home component correctly', () => {
    const wrapper = shallow(<Home products={productsDb} />)

    expect(wrapper).toMatchSnapshot()
  })
  it('renders a list of 6 products', () => {
    render(<Home products={productsDb} />, { wrapper: MemoryRouter })
    const products = screen.getAllByRole('listitem')
    expect(products).toHaveLength(6)
  })
  it('shows an error message if products is empty', () => {
    render(<Home products={[]} />, { wrapper: MemoryRouter })

    const message = screen.getByText('Something went wrong')
    expect(message).toBeInTheDocument()
  })
  it('renders an empty input field', () => {
    render(<Home products={productsDb} />, { wrapper: MemoryRouter })
    const input = screen.getByRole('searchbox')
    expect(input).toHaveTextContent('')
  })
  it('shows correct filtered products when searching by product name', () => {
    render(<Home products={productsDb} />, { wrapper: MemoryRouter })
    const input = screen.getByRole('searchbox')

    const filteredProducts = screen.getAllByRole('listitem')

    expect(filteredProducts).toHaveLength(6)

    userEvent.type(input, 'book')

    const newlyFilteredProducts = screen.getAllByRole('listitem')

    expect(newlyFilteredProducts).toHaveLength(1)
  })
  it('shows no filtered products if search doesnt match', () => {
    render(<Home products={productsDb} />, { wrapper: MemoryRouter })
    const input = screen.getByRole('searchbox')

    const filteredProducts = screen.getAllByRole('listitem')

    expect(filteredProducts).toHaveLength(6)

    userEvent.type(input, 'kljhter4k')

    const disappearedProducts = screen.queryAllByRole('listitem')

    expect(disappearedProducts).toHaveLength(0)
  })
  it('shows message if no products match search', () => {
    render(<Home products={productsDb} />, { wrapper: MemoryRouter })
    const input = screen.getByRole('searchbox')

    userEvent.type(input, 'kljhter4k')

    const message = screen.getByText(/no matching products/i)

    expect(message).toBeInTheDocument()
  })
})
