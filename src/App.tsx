import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import { productsDb, IProduct } from './mocks/products'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cart, setCart] = useState<IProduct[]>([])

  useEffect(() => {
    setProducts([...productsDb]) // irl this would be a fetch request
  }, [])

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product/:id"
          element={
            <ProductDetail products={products} cart={cart} setCart={setCart} />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </>
  )
}

export default App
