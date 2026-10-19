import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowRight, Check, Clock3, MapPin, PackageCheck, Bike, ChefHat } from 'lucide-react'

const stages = [
  {title:'Order confirmed',description:'The restaurant has received your order.',icon:Check},
  {title:'Preparing your food',description:'Freshness is on the menu. The kitchen is on it.',icon:ChefHat},
  {title:'Out for delivery',description:'Your delivery partner is heading your way.',icon:Bike},
  {title:'Delivered',description:'Enjoy every bite. You deserve it.',icon:PackageCheck},
]

export default function Tracking() {
  const {orderId} = useParams()
  const location = useLocation()
  const [order,setOrder] = useState(location.state?.order || null)
  const [active,setActive] = useState(0)
  useEffect(()=>{
    if(!order){const history=JSON.parse(localStorage.getItem('crave-orders-v1')||'[]');const found=history.find(o=>o.id===orderId);if(found){setOrder(found);setActive(Math.max(0,found.steps?.filter(s=>s.done).length-1))}}
  },[orderId,order])
  if(!order) return <div className="inner-page"><div className="empty-cart"><div className="empty-cart-icon"><PackageCheck size={32}/></div><h2>We couldn’t find that order.</h2><p>It may have been placed on another device.</p><Link className="primary-btn" to="/orders">View order history</Link></div></div>
  return <div className="inner-page tracking-page"><div className="tracking-success"><div className="success-check"><Check size={32}/></div><span className="eyebrow">ORDER PLACED SUCCESSFULLY</span><h1>That’s a <span>good choice.</span></h1><p>Your food adventure is underway. We’ll keep you posted.</p><div className="order-reference">ORDER ID <strong>#{order.id}</strong><button onClick={()=>navigator.clipboard?.writeText(order.id)}>Copy</button></div></div>
    <div className="tracking-layout"><section className="tracking-card"><div className="tracking-card-head"><div><span className="eyebrow">LIVE ORDER STATUS</span><h2>Track your order</h2></div><span className="status-chip"><span/> Confirmed</span></div><div className="eta-panel"><div className="eta-icon"><Bike size={24}/></div><div><small>ESTIMATED DELIVERY</small><h3>25–35 <span>min</span></h3><p>We’re getting your order ready.</p></div><div className="eta-art">🛵</div></div><div className="timeline">{stages.map((stage,i)=>{const Icon=stage.icon;const done=i<=active;return <div className={done?'timeline-step done':'timeline-step'} key={stage.title}><div className="timeline-marker"><Icon size={17}/></div><div className="timeline-copy"><strong>{stage.title}</strong><p>{stage.description}</p></div><small>{i===0?'Just now':i===active?'In progress':'Upcoming'}</small></div>})}</div><div className="demo-status-control"><span>Demo preview</span><div>{stages.map((s,i)=><button key={s.title} className={active===i?'active-demo-step':''} onClick={()=>setActive(i)} title={s.title}>{i+1}</button>)}</div><small>Tap a step to preview order progress.</small></div></section>
    <aside className="order-summary tracking-summary"><h2>Order details</h2><div className="tracking-address"><MapPin size={18}/><div><strong>Delivering to {order.form?.name}</strong><p>{order.form?.address}, {order.form?.city} {order.form?.pincode}</p></div></div><div className="summary-lines"><div><span>Items ({order.items?.reduce((n,i)=>n+i.quantity,0)})</span><strong>₹{order.items?.reduce((n,i)=>n+i.price*i.quantity,0)}</strong></div><div><span>Payment</span><strong>{({upi:'UPI',card:'Card',cash:'Cash on delivery'})[order.form?.payment]||'UPI'}</strong></div><div><span>Order total</span><strong>₹{order.total}</strong></div></div><Link to="/orders" className="primary-btn checkout-btn">View order history <ArrowRight size={17}/></Link></aside></div><div className="tracking-bottom"><Clock3 size={17}/> Need help? Contact our support team at <a href="mailto:hello@crave.example">hello@crave.example</a></div></div>
}