import { shallow } from 'enzyme'
import { render, screen } from '@testing-library/react'
import Cart from './Cart'
import userEvent from '@testing-library/user-event'

const mockCart = [
  { id: '234', name: 'bike', price: 3456 },
  { id: '4', name: 'desk', price: 1200 },
  { id: '2', name: 'table', price: 1400 },
  { id: '3', name: 'car', price: 150000 },
  { id: '4', name: 'desk', price: 1200 },
  { id: '2', name: 'table', price: 1400 },
]

describe('Cart', () => {
  it('shallow renders Cart component correctly', () => {
    const wrapper = shallow(<Cart setCart={jest.fn()} cart={[]} />)

    expect(wrapper).toMatchSnapshot()
  })
  it('shows all products in Cart', () => {
    render(<Cart cart={mockCart} setCart={jest.fn()} />)

    const products = screen.getAllByRole('listitem')

    expect(products).toHaveLength(4)
  })
  it('shows correct amount of desks', () => {
    render(<Cart cart={mockCart} setCart={jest.fn()} />)

    const deskAmount = screen.getByTestId('desk-amount')

    expect(deskAmount).toHaveTextContent('2')
  })
  it('shows correct price for 1 car', () => {
    render(<Cart cart={mockCart} setCart={jest.fn()} />)

    const carPrice = screen.getByTestId('car-price')

    expect(carPrice).toHaveTextContent('150000')
  })
  it('shows correct price for 2 desks', () => {
    render(<Cart cart={mockCart} setCart={jest.fn()} />)

    const deskPrice = screen.getByTestId('desk-price')

    expect(deskPrice).toHaveTextContent('2400')
  })
  it('calls setCart once when + button is clicked', async () => {
    const setCartSpy = jest.fn()
    render(<Cart cart={mockCart} setCart={setCartSpy} />)

    const incrementCarButton = screen.getByTestId('increment-car')

    userEvent.click(incrementCarButton)

    expect(setCartSpy).toHaveBeenCalledTimes(1)
    expect(setCartSpy).toHaveBeenCalledWith([
      ...mockCart,
      { id: '3', name: 'car', price: 150000 },
    ])
  })
  it('calls setCart once when - button is clicked', async () => {
    const setCartSpy = jest.fn()
    render(<Cart cart={mockCart} setCart={setCartSpy} />)

    const decrementDeskButton = screen.getByTestId('decrement-desk')

    userEvent.click(decrementDeskButton)

    expect(setCartSpy).toHaveBeenCalledTimes(1)
    expect(setCartSpy).toHaveBeenCalledWith([...mockCart])
  })
  it('shows a message if cart is empty', () => {
    render(<Cart cart={[]} setCart={jest.fn()} />)

    const message = screen.getByText(/empty/i)

    expect(message).toBeInTheDocument()
  })
  it('shows no message if cart contains products', () => {
    render(<Cart cart={mockCart} setCart={jest.fn()} />)

    const message = screen.queryByText(/empty/i)

    expect(message).toBeNull()
  })
  it('shows grand total correctly', () => {
    render(<Cart cart={mockCart} setCart={jest.fn()} />)

    const grandTotal = screen.getByText(/grand total/i)

    expect(grandTotal).toHaveTextContent('Grand total: SEK 157456')
  })
})
