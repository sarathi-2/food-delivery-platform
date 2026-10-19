import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Plus, Minus } from 'lucide-react'
import { imageUrl } from '../data'
import { useCart } from '../state/CartContext'

export default function CustomizeModal({ food, onClose }) {
  const [selected, setSelected] = useState([])
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  if (!food) return null
  const toggle = option => setSelected(old => old.includes(option) ? old.filter(x => x !== option) : [...old, option])
  return <AnimatePresence><motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
    <motion.div className="customize-modal" initial={{opacity:0, y:20, scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12}} onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20}/></button>
      <img className="modal-food-image" src={imageUrl(food.image, 900)} alt={food.name}/>
      <div className="modal-content"><span className="eyebrow">MAKE IT YOURS</span><h2>{food.name}</h2><p>{food.description}</p><h3>Customize your order</h3>
        <div className="option-list">{food.options?.map(option => <label key={option} className="option-row"><span>{option}</span><input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)}/></label>)}</div>
        <div className="modal-footer"><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1,quantity-1))}><Minus size={15}/></button><strong>{quantity}</strong><button onClick={() => setQuantity(quantity+1)}><Plus size={15}/></button></div><button className="primary-btn" onClick={() => { addItem(food, quantity, selected); onClose() }}>Add · ₹{food.price*quantity}</button></div>
      </div>
    </motion.div>
  </motion.div></AnimatePresence>
}