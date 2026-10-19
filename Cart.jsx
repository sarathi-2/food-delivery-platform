import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react'
import { useCart } from '../state/CartContext'

export default function Cart() {
  const {items, updateQuantity, removeItem, subtotal} = useCart()
  const [coupon,setCoupon] = useState('')
  const [applied,setApplied] = useState(false)
  const [couponError,setCouponError] = useState('')
  const navigate = useNavigate()
  const discount = applied ? Math.round(subtotal*.2) : 0
  const delivery = subtotal===0 || subtotal>=499 ? 0 : 39
  const taxes = Math.round(subtotal*.05)
  const total = subtotal-discount+delivery+taxes
  const applyCoupon = () => {
    if (coupon.trim().toUpperCase()==='CRAVE20' && subtotal>0) {setApplied(true);setCouponError('')}
    else {setApplied(false);setCouponError('Enter CRAVE20 to unlock 20% off your order.')}
  }
  return <div className="inner-page cart-page"><div className="page-intro compact-intro"><span className="eyebrow">ALMOST THERE</span><h1>Your <span>cart.</span></h1><p>All the good stuff, in one place.</p></div>
    {items.length===0 ? <div className="empty-cart"><div className="empty-cart-icon"><ShoppingBag size={32}/></div><h2>Your cart is feeling lonely.</h2><p>Let’s fix that with something delicious.</p><Link to="/menu" className="primary-btn">Explore the menu <ArrowRight size={17}/></Link></div> :
    <div className="cart-layout"><section className="cart-items-panel"><div className="cart-panel-heading"><h2>Your items <span>({items.reduce((n,i)=>n+i.quantity,0)})</span></h2><Link to="/menu">+ Add more</Link></div>
      {items.map(item=><article className="cart-item" key={item.key}><img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`} alt={item.name}/><div className="cart-item-main"><h3>{item.name}</h3><p>{item.restaurant}</p>{item.selectedOptions?.length>0&&<small>{item.selectedOptions.join(' · ')}</small>}<div className="cart-item-bottom"><div className="quantity-control"><button onClick={()=>updateQuantity(item.key,item.quantity-1)} aria-label="Decrease quantity"><Minus size={14}/></button><strong>{item.quantity}</strong><button onClick={()=>updateQuantity(item.key,item.quantity+1)} aria-label="Increase quantity"><Plus size={14}/></button></div><strong className="food-price">₹{item.price*item.quantity}</strong></div></div><button className="remove-item" onClick={()=>removeItem(item.key)} aria-label="Remove item"><Trash2 size={17}/></button></article>)}
      <Link to="/menu" className="back-link"><ArrowLeft size={16}/> Continue exploring</Link>
    </section><aside className="order-summary"><h2>Order summary</h2><p className="summary-caption">The final details before the delicious part.</p><div className="coupon-entry"><label><Tag size={16}/> Have a promo code?</label><div><input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="Enter code"/><button onClick={applyCoupon}>Apply</button></div>{couponError&&<small className="error-text">{couponError}</small>}{applied&&<small className="success-text">Nice! 20% discount applied.</small>}</div><div className="summary-lines"><div><span>Subtotal</span><strong>₹{subtotal}</strong></div><div><span>Delivery fee</span><strong>{delivery===0?'FREE':`₹${delivery}`}</strong></div><div><span>Taxes & fees</span><strong>₹{taxes}</strong></div>{applied&&<div className="discount-line"><span>Coupon discount</span><strong>−₹{discount}</strong></div>}</div><div className="summary-total"><span>Total</span><strong>₹{total}</strong></div><p className="free-delivery-note">{subtotal>=499?'🎉 You unlocked free delivery!':`Add ₹${Math.max(0,499-subtotal)} more for free delivery.`}</p><button className="primary-btn checkout-btn" onClick={()=>navigate('/checkout')}>Continue to checkout <ArrowRight size={18}/></button><p className="secure-note">🔒 Safe and secure checkout</p></aside></div>}
  </div>
}