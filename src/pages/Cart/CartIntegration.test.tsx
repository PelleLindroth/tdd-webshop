import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import App from '../../App'
import userEvent from '@testing-library/user-event'

describe('Cart integration test', () => {
  it('increases amount of cars by 1 when + button is clicked', async () => {
    renderWithRouter(<App />)

    // @ Home
    const carButton = screen.getByTestId('car')

    userEvent.click(carButton)

    // @ ProductDetail Car
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @Cart
    const carAmount = await screen.findByTestId('car-amount')

    expect(carAmount).toHaveTextContent('1')

    const incrementCarButton = screen.getByTestId('increment-car')

    userEvent.click(incrementCarButton)

    const updatedCarAmount = await screen.findByTestId('car-amount')

    expect(updatedCarAmount).toHaveTextContent('2')
  })
  it('decrease amount of desks by 1 when - button is clicked', async () => {
    renderWithRouter(<App />)

    // @ Home
    const deskButton = screen.getByTestId('desk')

    userEvent.click(deskButton)

    // @ ProductDetail Desk
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)
    userEvent.click(addToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @Cart
    const deskAmount = await screen.findByTestId('desk-amount')

    expect(deskAmount).toHaveTextContent('2')

    const decrementDeskButton = screen.getByTestId('decrement-desk')

    userEvent.click(decrementDeskButton)

    const updatedDeskAmount = await screen.findByTestId('desk-amount')

    expect(updatedDeskAmount).toHaveTextContent('1')
  })
  it('decreases price of cars by 150000 when - button is clicked', async () => {
    renderWithRouter(<App />)

    // @ Home
    const carButton = screen.getByTestId('car')

    userEvent.click(carButton)

    // @ ProductDetail Car
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)
    userEvent.click(addToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @ Cart
    const carPrice = screen.getByTestId('car-price')

    expect(carPrice).toHaveTextContent('300000')

    const decrementCarButton = screen.getByTestId('decrement-car')

    userEvent.click(decrementCarButton)

    expect(carPrice).toHaveTextContent('150000')
  })
  it('removes product from cart if amount reaches 0', async () => {
    renderWithRouter(<App />)

    // @ Home
    const deskButton = screen.getByTestId('desk')

    userEvent.click(deskButton)

    // @ ProductDetail Desk
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @Cart
    const deskAmount = await screen.findByTestId('desk-amount')

    expect(deskAmount).toHaveTextContent('1')

    const decrementDeskButton = screen.getByTestId('decrement-desk')

    userEvent.click(decrementDeskButton)

    const deskItem = screen.queryByTestId('desk-item')

    expect(deskItem).not.toBeInTheDocument()
  })
  it('removes product altogether if delete button is pressed', async () => {
    renderWithRouter(<App />)

    // @ Home
    const deskButton = screen.getByTestId('desk')

    userEvent.click(deskButton)

    // @ ProductDetail Desk
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)
    userEvent.click(addToCartButton)
    userEvent.click(addToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @Cart
    const deleteButton = screen.getByTestId('delete-desk')

    userEvent.click(deleteButton)

    const deskItem = screen.queryByTestId('desk-item')

    expect(deskItem).not.toBeInTheDocument()
  })
  it('does not delete anything else from cart when desk delete button is pressed', async () => {
    renderWithRouter(<App />)

    // @ Home
    const deskButton = screen.getByTestId('desk')

    userEvent.click(deskButton)

    // @ ProductDetail Desk
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)

    const homeMenuItem = screen.getByTestId('home')

    userEvent.click(homeMenuItem)

    // @Home
    const bookButton = screen.getByTestId('book')

    userEvent.click(bookButton)

    // @ ProductDetail Book
    const addBookToCartButton = await screen.findByRole('button')

    userEvent.click(addBookToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @ Cart
    const deleteButton = screen.getByTestId('delete-desk')

    userEvent.click(deleteButton)

    const bookItem = screen.queryByTestId('book-item')

    expect(bookItem).toBeInTheDocument()
  })
  it('updates Grand Total correctly when + button is clicked', async () => {
    renderWithRouter(<App />)

    // @ Home
    const deskButton = screen.getByTestId('desk')

    userEvent.click(deskButton)

    // @ ProductDetail Desk
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @ Cart
    const grandTotal = screen.getByText(/grand total/i)

    expect(grandTotal).toHaveTextContent('Grand total: SEK 1200')

    const incrementButton = screen.getByTestId('increment-desk')

    userEvent.click(incrementButton)

    expect(grandTotal).toHaveTextContent('Grand total: SEK 2400')
  })
  it('updates Grand Total correctly when - button is clicked', async () => {
    renderWithRouter(<App />)

    // @ Home
    const deskButton = screen.getByTestId('desk')

    userEvent.click(deskButton)

    // @ ProductDetail Desk
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)
    userEvent.click(addToCartButton)
    userEvent.click(addToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @ Cart
    const grandTotal = screen.getByText(/grand total/i)

    expect(grandTotal).toHaveTextContent('Grand total: SEK 3600')

    const decrementButton = screen.getByTestId('decrement-desk')

    userEvent.click(decrementButton)

    expect(grandTotal).toHaveTextContent('Grand total: SEK 2400')
  })
  it('Sets Grand Total to 0 if all products are removed', async () => {
    renderWithRouter(<App />)

    // @ Home
    const deskButton = screen.getByTestId('desk')

    userEvent.click(deskButton)

    // @ ProductDetail Desk
    const addToCartButton = await screen.findByRole('button')

    userEvent.click(addToCartButton)

    const homeMenuItem = screen.getByTestId('home')

    userEvent.click(homeMenuItem)

    // @Home
    const bookButton = screen.getByTestId('book')

    userEvent.click(bookButton)

    // @ ProductDetail Book
    const addBookToCartButton = await screen.findByRole('button')

    userEvent.click(addBookToCartButton)

    const cartMenuItem = screen.getByTestId('cart')

    userEvent.click(cartMenuItem)

    // @ Cart
    const grandTotal = screen.getByText(/grand total/i)

    expect(grandTotal).toHaveTextContent('Grand total: SEK 1320')

    const deleteDeskButton = screen.getByTestId('delete-desk')

    userEvent.click(deleteDeskButton)

    expect(grandTotal).toHaveTextContent('Grand total: SEK 120')

    const deleteBookButton = screen.getByTestId('delete-book')

    userEvent.click(deleteBookButton)

    expect(grandTotal).toHaveTextContent('Grand total: SEK 0')
  })
})
