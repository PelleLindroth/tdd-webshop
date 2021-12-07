import { shallow } from 'enzyme'
import ProductDetail from './ProductDetail'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { productsDb } from '../../mocks/products'
import { renderWithRouter } from '../../testing-utils'
import {MemoryRouter} from "react-router-dom"
import {Route, Routes} from "react-router"


describe('ProductDetail', () => {
  it('renders ProductDetail component correctly', () => {
    const wrapper = shallow(<ProductDetail products={productsDb} />)

    expect(wrapper).toMatchSnapshot()
  })
  it("renders product detail page for a book when params id is 1", () => {
    // render(<MemoryRouter>
    //   <Routes>
    //     <Route path='/product/1' element={<ProductDetail  products={productsDb} />} />
    //   </Routes>
    // </MemoryRouter>)

    renderWithRouter(<ProductDetail  products={productsDb} />)

    
    const title = screen.getByText(/book/i)
    expect(title).toBeInTheDocument()
  })
  // it("renders a not found message if product with matching id doesn't exist", () => {

  // })
  it("renders an Add to Cart button", () => {
    
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

