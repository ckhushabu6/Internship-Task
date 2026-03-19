import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'; // Ye line add karein
import Cart from './pages/Cart' // Naya Cart page import kiya
import Footer from './components/Footer'
import ProductDetails from './pages/ProductDetails'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      {/* <Navbar /> */}
      <main className="min-h-screen"> {/* Taaki footer hamesha niche rahe */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/products" element={<Shop />} />
          {/* :id zaroori hai product identify karne ke liye */}
          <Route path='/product/:id' element={<ProductDetails />} /> 
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  )
}

export default App