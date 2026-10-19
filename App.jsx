import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Tracking from './pages/Tracking'
import Orders from './pages/Orders'

export default function App() {
  return <Layout><AnimatePresence mode="wait"><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/menu" element={<Menu/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
    <Route path="/tracking/:orderId" element={<Tracking/>}/>
    <Route path="/orders" element={<Orders/>}/>
    <Route path="/tracking" element={<Navigate to="/orders" replace/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes></AnimatePresence></Layout>
}