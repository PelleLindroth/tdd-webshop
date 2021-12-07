import { shallow } from 'enzyme'
import { render, screen } from '@testing-library/react'
import Cart from './Cart'

const mockCart = [
  { name: 'Bike', id: '234', price: 3456 },
  { id: '4', name: 'desk', price: 1200 },
  { id: '2', name: 'A table', price: 1400 },
  { id: '3', name: 'A car', price: 150000 },
  { id: '4', name: 'desk', price: 1200 },
  { id: '2', name: 'A table', price: 1400 },
]

describe('Cart', () => {
  it('shallow renders Cart component correctly', () => {
    const wrapper = shallow(
      <Cart cart={[{ name: 'Bike', id: '234', price: 3456 }]} />
    )

    expect(wrapper).toMatchSnapshot()
  })
  it('shows all products in Cart', () => {
    render(<Cart cart={mockCart} />)

    const products = screen.getAllByRole('listitem')

    expect(products).toHaveLength(4)
  })
  it('shows correct amount of desks', () => {
    render(<Cart cart={mockCart} />)

    const deskAmount = screen.getAllByTestId('desk-amount')

    expect(deskAmount).toHaveTextContent('2')
  })
})

//IN CART:

// Bike: 1   + - <delete> Total: 3456
// Desk: 2   + - <delete> Total: 2400

// shows all products in cart and their amount
// shows a message if cart is empty
// shows grand total
// adds amount on product when plus button is pressed
// removes amount on product when minus button is pressed
// removes product altogether if delete button is pressed
// grand total updates correctly
