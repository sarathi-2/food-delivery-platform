import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, ShoppingBag } from 'lucide-react'
import { useCart } from '../state/CartContext'

export default function Checkout() {
  const {items,subtotal,clearCart} = useCart()
  const navigate = useNavigate()
  const [form,setForm] = useState({name:'',phone:'',address:'',city:'Coimbatore',pincode:'',payment:'upi',instructions:''})
  const [errors,setErrors] = useState({})
  const [submitting,setSubmitting] = useState(false)
  const delivery = subtotal>=499?0:39
  const total = subtotal+delivery+Math.round(subtotal*.05)
  const update = e => setForm({...form,[e.target.name]:e.target.value})
  const submit = e => {
    e.preventDefault()
    const next = {}
    if(form.name.trim().length<2) next.name='Please enter your full name.'
    if(!/^[6-9]\d{9}$/.test(form.phone)) next.phone='Enter a valid 10-digit Indian mobile number.'
    if(form.address.trim().length<8) next.address='Please enter a complete delivery address.'
    if(!form.city.trim()) next.city='Please enter your city.'
    if(!/^\d{6}$/.test(form.pincode)) next.pincode='Enter a valid 6-digit PIN code.'
    setErrors(next)
    if(Object.keys(next).length) return
    setSubmitting(true)
    const order = {id:`CR${Date.now().toString().slice(-7)}`,items,total,form,createdAt:new Date().toISOString(),status:'Confirmed',steps:[{title:'Order confirmed',time:'Just now',done:true},{title:'Preparing your food',time:'Coming up',done:false},{title:'Out for delivery',time:'Coming up',done:false},{title:'Delivered',time:'Coming up',done:false}]}
    const history = JSON.parse(localStorage.getItem('crave-orders-v1')||'[]')
    localStorage.setItem('crave-orders-v1',JSON.stringify([order,...history]))
    clearCart()
    navigate(`/tracking/${order.id}`,{state:{order}})
  }
  if(items.length===0) return <div className="inner-page"><div className="empty-cart"><div className="empty-cart-icon"><ShoppingBag size={32}/></div><h2>Your cart is empty</h2><p>Add a few favorites before checking out.</p><Link to="/menu" className="primary-btn">Browse menu</Link></div></div>
  return <div className="inner-page checkout-page"><div className="page-intro compact-intro"><span className="eyebrow">ONE LAST THING</span><h1>Let’s get it <span>to you.</span></h1><p>Tell us where to deliver your happiness.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit} noValidate>
    <section className="form-card"><div className="form-section-title"><span className="form-icon"><MapPin size={19}/></span><div><h2>Delivery details</h2><p>Where should we bring your order?</p></div></div><div className="form-grid"><label className="field full-field">Full name<input name="name" value={form.name} onChange={update} placeholder="e.g. Priya Kumar"/>{errors.name&&<small className="error-text">{errors.name}</small>}</label><label className="field">Mobile number<input name="phone" value={form.phone} onChange={update} placeholder="10-digit mobile" inputMode="numeric" maxLength="10"/>{errors.phone&&<small className="error-text">{errors.phone}</small>}</label><label className="field">PIN code<input name="pincode" value={form.pincode} onChange={update} placeholder="6-digit PIN" inputMode="numeric" maxLength="6"/>{errors.pincode&&<small className="error-text">{errors.pincode}</small>}</label><label className="field full-field">Delivery address<textarea name="address" value={form.address} onChange={update} placeholder="House / flat, street, landmark" rows="3"/>{errors.address&&<small className="error-text">{errors.address}</small>}</label><label className="field full-field">City<input name="city" value={form.city} onChange={update}/>{errors.city&&<small className="error-text">{errors.city}</small>}</label><label className="field full-field">Delivery instructions <span className="optional">(optional)</span><input name="instructions" value={form.instructions} onChange={update} placeholder="Gate code, call on arrival, etc."/></label></div></section>
    <section className="form-card"><div className="form-section-title"><span className="form-icon"><CreditCard size={19}/></span><div><h2>Payment method</h2><p>Choose how you’d like to pay.</p></div></div><div className="payment-options"><label className={form.payment==='upi'?'payment-option chosen':'payment-option'}><input type="radio" name="payment" value="upi" checked={form.payment==='upi'} onChange={update}/><span className="payment-symbol">↗</span><span><strong>UPI payment</strong><small>GPay, PhonePe, Paytm</small></span><CheckCircle2 className="payment-check" size={18}/></label><label className={form.payment==='card'?'payment-option chosen':'payment-option'}><input type="radio" name="payment" value="card" checked={form.payment==='card'} onChange={update}/><span className="payment-symbol">▤</span><span><strong>Credit / debit card</strong><small>All major cards accepted</small></span><CheckCircle2 className="payment-check" size={18}/></label><label className={form.payment==='cash'?'payment-option chosen':'payment-option'}><input type="radio" name="payment" value="cash" checked={form.payment==='cash'} onChange={update}/><span className="payment-symbol">₹</span><span><strong>Cash on delivery</strong><small>Pay when your food arrives</small></span><CheckCircle2 className="payment-check" size={18}/></label></div><p className="demo-payment-note">Demo checkout: no real payment will be collected.</p></section>
    <button className="primary-btn place-order-btn" type="submit" disabled={submitting}>{submitting?'Placing your order...':`Place order · ₹${total}`}</button><Link to="/cart" className="back-link"><ArrowLeft size={16}/> Back to cart</Link>
  </form><aside className="order-summary checkout-summary"><h2>Your order</h2>{items.map(i=><div className="checkout-item" key={i.key}><img src={`https://images.unsplash.com/${i.image}?auto=format&fit=crop&w=150&q=75`} alt={i.name}/><div><strong>{i.quantity} × {i.name}</strong><small>{i.restaurant}</small></div><strong>₹{i.price*i.quantity}</strong></div>)}<div className="summary-lines"><div><span>Subtotal</span><strong>₹{subtotal}</strong></div><div><span>Delivery fee</span><strong>{delivery?'₹'+delivery:'FREE'}</strong></div><div><span>Taxes & fees</span><strong>₹{Math.round(subtotal*.05)}</strong></div></div><div className="summary-total"><span>Total to pay</span><strong>₹{total}</strong></div><p className="secure-note">🔒 Your details stay private and secure.</p></aside></div></div>
}