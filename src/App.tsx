import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import Profile from './pages/Profile/Profile'
import { productsDb, IProduct } from './mocks/products'
import { IUser } from './mocks/users'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cart, setCart] = useState<IProduct[]>([])
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    setProducts([...productsDb]) // irl this would be a fetch request
  }, [])

  return (
    <>
      <Header cart={cart} user={user} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />

        {user ? <Route path="/profile" element={<Profile />} /> : <Route path="/login" element={<Login setUser={setUser} />} />}

        <Route path="/product/:id" element={<ProductDetail products={products} cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  )
}

export default App
