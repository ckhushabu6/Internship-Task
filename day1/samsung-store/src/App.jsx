import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductDetails from './pages/ProductDetails'


function App() {
  

  return (
    <>
   
   <Navbar/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/products' element={<ProductDetails/>}/>
        <Route path='/contact'  element={<Contact/>}/>

    </Routes>
    <Footer/>
    </>
  )
}

export default App
