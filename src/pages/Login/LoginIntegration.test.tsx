import { shallow } from 'enzyme'
import {render, screen} from "@testing-library/react"
import { renderWithRouter } from '../../testing-utils'
import userEvent from "@testing-library/user-event"
 import App from '../../App'

describe('Login integration tests', () => {
  it("renders my profile page correctly if user is logged in", async() => {
    renderWithRouter(<App />)

    // @Home
    const loginMenuItem = screen.getByTestId('login')

    userEvent.click(loginMenuItem)

    // @Login
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const loginButton = screen.getByRole('button', { name: /login/i })

    userEvent.type(emailInput, 'emma@yahoo.com')
    userEvent.type(passwordInput, 'bananpaj')
    userEvent.click(loginButton)

    // @MyProfile
    const profileTitle = await screen.findByRole("heading", {name: "My Profile"})
    expect(profileTitle).toBeInTheDocument()
  })
  it("shows logged in message in header when clicking login button", () => {
    renderWithRouter(<App />)

    // @Home
    const loginMenuItem = screen.getByTestId('login')

    userEvent.click(loginMenuItem)

    // @Login
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const loginButton = screen.getByRole('button', { name: /login/i })

    userEvent.type(emailInput, 'emma@yahoo.com')
    userEvent.type(passwordInput, 'bananpaj')
    userEvent.click(loginButton)

    // @MyProfile
    const loggedInMessage = screen.getByText(/logged in as/i)
    expect(loggedInMessage).toBeInTheDocument()
  })
})



// 
//  (integration)
// removes login menu item form header when user is logged in (integration)
// shows my profile menu item in header when user is logged in (integration)
// render Home view when user logs out (integration)
// shows login menu item in header when user logs out (integration)
// removes my profile menu item from header when user logs out (integration)
