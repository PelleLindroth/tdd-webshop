import { shallow } from 'enzyme'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import Login from './Login'
import userEvent from '@testing-library/user-event'

describe('Login unit tests', () => {
  it('renders Login component correctly', () => {
    const wrapper = shallow(<Login setUser={jest.fn()} />)

    expect(wrapper).toMatchSnapshot()
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
})

// updates values in text inputs when typing
// shows error message when submitting wrong credentials
// shows error message if either email or password input fields is empty
// renders my profile page correctly if user is logged in
// redirects to login from my profile if user is not logged in
