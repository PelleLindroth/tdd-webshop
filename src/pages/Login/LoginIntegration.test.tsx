import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('Login integration tests', () => {
  it('renders my profile page correctly if user is logged in', async () => {
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
    const profileTitle = await screen.findByRole('heading', {
      name: 'My Profile',
    })
    expect(profileTitle).toBeInTheDocument()
  })
  it('shows logged in message in header when clicking login button', () => {
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
  it('removes login menu item from header and renders profile menu item when user is logged in (integration)', async () => {
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

    const disappearedLoginMenuItem = screen.queryByTestId('login')
    const profileMenuItem = await screen.findByTestId('profile')

    expect(disappearedLoginMenuItem).not.toBeInTheDocument()
    expect(profileMenuItem).toBeInTheDocument()
  })
  it('render Home view when user logs out', () => {
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

    // @Profile
    const logoutButton = screen.getByRole('button', { name: /log out/i })

    userEvent.click(logoutButton)

    // @Home
    const HomeHeading = screen.getByRole('heading', { name: /home/i })

    expect(HomeHeading).toBeInTheDocument()
  })
  it('shows login menu item in header when user logs out', () => {
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

    // @Profile
    const logoutButton = screen.getByRole('button', { name: /log out/i })

    userEvent.click(logoutButton)

    // @Home
    expect(loginMenuItem).toBeInTheDocument()
  })
  it('removes my profile menu item from header when user logs out', () => {
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

    // @Profile
    const logoutButton = screen.getByRole('button', { name: /log out/i })

    userEvent.click(logoutButton)

    // @Home
    const disappearedMenuItem = screen.queryByTestId('profile')
    expect(disappearedMenuItem).not.toBeInTheDocument()
  })
})
