import { shallow } from 'enzyme'
import ProductDetail from './ProductDetail'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { productsDb } from '../../mocks/products'
import { renderWithPath } from '../../testing-utils'

describe('ProductDetail', () => {
  it('renders ProductDetail component correctly', () => {
    const wrapper = shallow(
      <ProductDetail cart={[]} setCart={jest.fn()} products={productsDb} />
    )

    expect(wrapper).toMatchSnapshot()
  })
  it('renders product detail page for a book when params id is 1', async () => {
    renderWithPath(
      '/product/1',
      <ProductDetail cart={[]} setCart={jest.fn()} products={productsDb} />,
      '/product/:id'
    )

    const title = await screen.findByText(/book/i)
    expect(title).toBeInTheDocument()
  })
  it("renders a not found message if product with matching id doesn't exist", () => {
    renderWithPath(
      '/product/25',
      <ProductDetail cart={[]} setCart={jest.fn()} products={productsDb} />,
      '/product/:id'
    )

    const message = screen.queryByText(/no product/i)

    expect(message).toBeInTheDocument()
  })
  it('renders an Add to Cart button', async () => {
    renderWithPath(
      '/product/2',
      <ProductDetail cart={[]} setCart={jest.fn()} products={productsDb} />,
      '/product/:id'
    )

    const button = await screen.findByRole('button', { name: /add to cart/i })

    expect(button).toBeInTheDocument()
  })
  it('calls setCart when button is clicked', async () => {
    const setCartSpy = jest.fn()

    renderWithPath(
      '/product/2',
      <ProductDetail cart={[]} setCart={setCartSpy} products={productsDb} />,
      '/product/:id'
    )

    const button = await screen.findByRole('button', { name: /add to cart/i })

    userEvent.click(button)

    expect(setCartSpy).toHaveBeenCalled()
    expect(setCartSpy).toHaveBeenCalledTimes(1)
  })
})

// describe("Product detail integration tests", () => {
//   it("updates cart in header component when button is clicked", () => {
//     // render App
//     // click on product
//     // click add to cart
//     // check header component updates
//   })
// })

// product matches params id - renders correct product

// 404 no product found if no product with matching id exists

// Renders an Add to cart button

// Adds products to cart when add button is clicked

// Integration test - header cart updates when button is clicked
