import { motion } from 'framer-motion'
import { Heart, Plus, Star, Clock3 } from 'lucide-react'
import { useState } from 'react'
import { imageUrl } from '../data'
import { useCart } from '../state/CartContext'

export default function FoodCard({ food, onCustomize }) {
  const { addItem } = useCart()
  const [liked, setLiked] = useState(false)
  return <motion.article className="food-card" whileHover={{ y: -5 }} transition={{ duration: .2 }}>
    <div className="food-image-wrap"><img className="food-image" src={imageUrl(food.image, 700)} alt={food.name} loading="lazy" onError={e => { e.currentTarget.style.opacity = .25 }}/>
      {food.popular && <span className="food-tag">FAN FAVORITE</span>}
      <button className={liked ? 'favorite liked' : 'favorite'} onClick={() => setLiked(!liked)} aria-label="Add to favorites"><Heart size={17} fill={liked ? 'currentColor' : 'none'}/></button>
    </div>
    <div className="food-info"><div className="food-title-row"><h3>{food.name}</h3><span className="food-rating"><Star size={14} fill="currentColor"/>{food.rating}</span></div>
      <p className="food-description">{food.description}</p><p className="food-restaurant">{food.restaurant} <span>·</span> <Clock3 size={13}/> 20–30 min</p>
      <div className="food-bottom"><strong className="food-price">₹{food.price}</strong><div className="food-actions">{food.options?.length > 0 && <button className="customize-btn" onClick={() => onCustomize(food)}>Customize</button>}<button className="add-btn" aria-label={`Add ${food.name}`} onClick={() => addItem(food)}><Plus size={18}/></button></div></div>
    </div>
  </motion.article>
}