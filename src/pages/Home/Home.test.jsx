import { shallow } from 'enzyme'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'
import { renderWithRouter } from '../../testing-utils'

describe('Home', () => {
  it('renders Home component correctly', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper).toMatchSnapshot()
  })
  it('renders a list of 6 products initially', () => {
    renderWithRouter(<Home />)
    const products = screen.getAllByRole('listitem')
    expect(products).toHaveLength(6)
  })
  it('renders an empty input field', () => {
    renderWithRouter(<Home />)
    const input = screen.getByRole('searchbox')
    expect(input).toHaveTextContent('')
  })
  it('shows correct filtered products when searching by product name', () => {
    renderWithRouter(<Home />)
    const input = screen.getByRole('searchbox')

    const filteredProducts = screen.getAllByRole('listitem')

    expect(filteredProducts).toHaveLength(6)

    userEvent.type(input, 'book')

    const newlyFilteredProducts = screen.getAllByRole('listitem')

    expect(newlyFilteredProducts).toHaveLength(1)
  })
  it('returns car when CAR is searched (case insentitive search)', () => {
    renderWithRouter(<Home />)
    const input = screen.getByRole('searchbox')
    userEvent.type(input, 'CAR')
    const newlyFilteredProducts = screen.queryAllByRole('listitem')

    expect(newlyFilteredProducts).toHaveLength(1)
  })
  it('shows no filtered products if search doesnt match', () => {
    renderWithRouter(<Home />)
    const input = screen.getByRole('searchbox')

    const filteredProducts = screen.getAllByRole('listitem')

    expect(filteredProducts).toHaveLength(6)

    userEvent.type(input, 'kljhter4k')

    const disappearedProducts = screen.queryAllByRole('listitem')

    expect(disappearedProducts).toHaveLength(0)
  })
  it('shows message if no products match search', () => {
    renderWithRouter(<Home />)
    const input = screen.getByRole('searchbox')

    userEvent.type(input, 'kljhter4k')

    const message = screen.getByText(/no matching products/i)

    expect(message).toBeInTheDocument()
  })
})
