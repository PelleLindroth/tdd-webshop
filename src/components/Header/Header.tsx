import { Link } from 'react-router-dom'
import { IProduct } from '../../mocks/products'
import { IUser } from '../../mocks/users'

// /login: conditional if user is not logged in//}

interface HeaderProps {
  cart: IProduct[]
  user: IUser | null
}

const Header = (props: HeaderProps) => {
  const { cart, user } = props

  return (
    <header>
      <h1>THIS IS THE WEBSHOP</h1>
      <h2>Items in cart: {cart ? cart.length : 0}</h2>
      <nav>
        <Link data-testid="home" to="/">
          Home
        </Link>
        <Link data-testid="login" to="/login">
          Login
        </Link>
        <Link data-testid="cart" to="/cart">
          My Cart
        </Link>
      </nav>
      {user && <p>Logged in as {user.email}</p>}
    </header>
  )
}

export default Header
