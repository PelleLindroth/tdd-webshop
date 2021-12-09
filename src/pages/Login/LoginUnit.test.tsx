import { shallow } from 'enzyme'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import Login from './Login'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

describe('Login unit tests', () => {
  it('renders Login component correctly', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Login setUser={jest.fn()} />
      </MemoryRouter>
    )

    expect(wrapper.find(Login)).toMatchSnapshot()
  })
  it('renders login form with text inputs for user email and password and a login button', () => {
    renderWithRouter(<Login setUser={jest.fn()} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const loginButton = screen.getByRole('button', { name: /login/i })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })
  it('updates values in email input when typing', () => {
    renderWithRouter(<Login setUser={jest.fn()} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })

    userEvent.type(emailInput, 'pelle')

    expect(screen.getByRole('form')).toHaveFormValues({
      email: 'pelle',
      password: '',
    })
  })
  it('updates values in password input when typing', () => {
    renderWithRouter(<Login setUser={jest.fn()} />)

    const passwordInput = screen.getByRole('textbox', { name: /password/i })

    userEvent.type(passwordInput, 'bananpaj')

    expect(screen.getByRole('form')).toHaveFormValues({
      email: '',
      password: 'bananpaj',
    })
  })
  it('shows error message when submitting wrong credentials', async () => {
    renderWithRouter(<Login setUser={jest.fn()} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const loginButton = screen.getByRole('button', { name: /login/i })

    userEvent.type(emailInput, 'pelle')
    userEvent.type(passwordInput, 'bananpaj')
    userEvent.click(loginButton)

    const errorMessage = await screen.findByText(
      'Email and password does not match our records'
    )
    expect(errorMessage).toBeInTheDocument()
  })
  it('calls setUser once when login button is clicked and credentials are correct', () => {
    const setUserSpy = jest.fn()
    renderWithRouter(<Login setUser={setUserSpy} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const loginButton = screen.getByRole('button', { name: /login/i })

    userEvent.type(emailInput, 'pelle@yahoo.com')
    userEvent.type(passwordInput, 'grillkorv')
    userEvent.click(loginButton)

    expect(setUserSpy).toHaveBeenCalledTimes(1)
    expect(setUserSpy).toHaveBeenCalledWith({
      email: 'pelle@yahoo.com',
      password: 'grillkorv',
    })
  })
  it('doesnt call setUser when login button is clicked but credentials are incorrect', () => {
    const setUserSpy = jest.fn()
    renderWithRouter(<Login setUser={setUserSpy} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const loginButton = screen.getByRole('button', { name: /login/i })

    userEvent.type(emailInput, 'emma@yahoo.com')
    userEvent.type(passwordInput, 'grillkorv')
    userEvent.click(loginButton)

    expect(setUserSpy).toHaveBeenCalledTimes(0)
  })
  it('disables login button by default', () => {
    renderWithRouter(<Login setUser={jest.fn()} />)
    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeDisabled()
  })
  it('enables login button by when both fields have input values', () => {
    renderWithRouter(<Login setUser={jest.fn()} />)
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const loginButton = screen.getByRole('button', { name: /login/i })

    userEvent.type(emailInput, 'emma@yahoo.com')

    expect(loginButton).toBeDisabled()
    userEvent.type(passwordInput, 'grillkorv')

    expect(loginButton).toBeEnabled()
  })
})
