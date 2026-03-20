import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'; // Ye line add karein
import Cart from './pages/Cart' // Naya Cart page import kiya
import Footer from './components/Footer'
import ProductDetails from './pages/ProductDetails'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <main className="min-h-screen">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/product/:id' element={<ProductDetails />} /> 
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
    </AuthProvider>
  )
}

export default App