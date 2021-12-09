import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import Profile from './pages/Profile/Profile'
import { IProduct } from './mocks/products'
import { IUser } from './mocks/users'

function App() {
  const [cart, setCart] = useState<IProduct[]>([])
  const [user, setUser] = useState<IUser | null>(null)

  return (
    <>
      <Header cart={cart} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />

        {user ? (
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
        ) : (
          <Route path="/login" element={<Login setUser={setUser} />} />
        )}

        <Route
          path="/product/:id"
          element={<ProductDetail cart={cart} setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  )
}

export default App
