import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, PackageCheck, ShoppingBag } from 'lucide-react'

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem('crave-orders-v1')||'[]')
  return <div className="inner-page orders-page"><div className="page-intro"><span className="eyebrow">YOUR FOOD JOURNEY</span><h1>Order <span>history.</span></h1><p>Every order has a story. Revisit your favorites anytime.</p></div>
    {orders.length===0?<div className="empty-cart"><div className="empty-cart-icon"><ShoppingBag size={32}/></div><h2>No orders yet</h2><p>Your first delicious order is waiting to happen.</p><Link to="/menu" className="primary-btn">Find your first favorite <ArrowRight size={17}/></Link></div>:
    <div className="orders-list">{orders.map(order=><article className="history-card" key={order.id}><div className="history-top"><div className="history-order-icon"><PackageCheck size={21}/></div><div><strong>Order #{order.id}</strong><small>{new Date(order.createdAt).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})}</small></div><span className="status-chip"><span/>{order.status}</span></div><div className="history-items">{order.items?.map(item=><div key={item.key}><img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=120&q=75`} alt={item.name}/><span>{item.quantity} × {item.name}</span><strong>₹{item.price*item.quantity}</strong></div>)}</div><div className="history-bottom"><span><Clock3 size={15}/> {order.form?.city||'Delivery'} · ₹{order.total}</span><Link to={`/tracking/${order.id}`}>Track order <ArrowRight size={15}/></Link></div></article>)}</div>}
  </div>
}