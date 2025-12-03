import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ShopsProvider } from './context/ShopsContext'
import Login from './components/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import OtpVerify from './pages/OtpVerify'
import Items from './pages/Items'
import Cart from './pages/Cart'

export default function App() {
  return (
    <ShopsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </ShopsProvider>
  )
}
