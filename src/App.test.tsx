// import { mount } from 'enzyme'
import { screen } from '@testing-library/react'
import { renderWithRouter } from './testing-utils'
import App from './App'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  it('initially renders App with Header component', () => {
    renderWithRouter(<App />)

    const header = screen.getByRole('banner')

    expect(header).toBeInTheDocument()
  })
  it('initally renders Home view', () => {
    renderWithRouter(<App />)

    const products = screen.getAllByRole('listitem')

    expect(products).toHaveLength(6)
  })
  it('changes to Cart view when cart menu item is clicked', async () => {
    renderWithRouter(<App />)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    const cartText = screen.getByRole('heading', { name: 'Cart' })

    expect(cartText).toBeInTheDocument()
  })
  it('changes to Login view when login menu item is clicked', async () => {
    renderWithRouter(<App />)

    const loginMenuItem = screen.getByTestId('login')

    userEvent.click(loginMenuItem)

    const loginText = screen.getByRole('heading', { name: /login/i })

    expect(loginText).toBeInTheDocument()
  })
  it('goes back to Home from Login view when Home menu item is clicked', async () => {
    renderWithRouter(<App />)

    const loginMenuItem = screen.getByTestId('login')

    userEvent.click(loginMenuItem)

    const homeMenuItem = screen.getByTestId('home')

    userEvent.click(homeMenuItem)

    const homeText = screen.getByRole('heading', { name: /home/i })
    expect(homeText).toBeInTheDocument()
  })
  it('updates cart item in Header when going to ProductDetail and click Add to Cart', async () => {
    renderWithRouter(<App />)

    const itemsInCart = screen.getByText(/items in cart/i)

    expect(itemsInCart).toHaveTextContent('0')

    const tableButton = screen.getByTestId(/table/i)

    userEvent.click(tableButton)

    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)

    const updatedItemsInCart = screen.getByText(/items in cart/i)
    expect(updatedItemsInCart).toHaveTextContent('1')
  })
})
