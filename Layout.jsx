import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, MapPin, Menu, X, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../state/CartContext'

export default function Layout({ children }) {
  const { count } = useCart()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const nav = [['/', 'Discover'], ['/menu', 'Menu'], ['/orders', 'My orders']]
  return <div className="app-shell">
    <header className="topbar">
      <div className="nav-wrap">
        <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-mark"><UtensilsCrossed size={21}/></span><span>crave<span className="brand-dot">.</span></span></Link>
        <div className="delivery-location"><MapPin size={17}/><span><small>Delivering to</small><strong>Coimbatore, TN</strong></span><span className="location-chevron">⌄</span></div>
        <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
        <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
          {nav.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
          <Link to="/cart" className="cart-link" onClick={() => setOpen(false)}><ShoppingBag size={19}/><span>Cart</span>{count > 0 && <b className="cart-count">{count}</b>}</Link>
        </nav>
      </div>
    </header>
    <main key={location.pathname} className="page-content">{children}</main>
    <footer className="footer"><div className="footer-brand"><span className="brand-mark"><UtensilsCrossed size={18}/></span><strong>crave<span className="brand-dot">.</span></strong></div><p>Good food. Good mood. Delivered to your door.</p><span>© 2026 Crave. Made for hungry moments.</span></footer>
  </div>
}