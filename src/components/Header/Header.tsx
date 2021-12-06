import { Link } from 'react-router-dom'

// /login: conditional if user is not logged in//}

const Header = () => {
  return (
    <header>
      <h1>THIS IS THE WEBSHOP</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">My Cart</Link>
      </nav>
    </header>
  )
}

export default Header
