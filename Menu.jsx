import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { categories, foods } from '../data'
import FoodCard from '../components/FoodCard'
import CustomizeModal from '../components/CustomizeModal'

export default function Menu() {
  const [category,setCategory] = useState('all')
  const [query,setQuery] = useState('')
  const [sort,setSort] = useState('recommended')
  const [customFood,setCustomFood] = useState(null)
  const filtered = foods.filter(f => (category==='all'||f.category===category) && `${f.name} ${f.restaurant}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==='price-low'?a.price-b.price:sort==='price-high'?b.price-a.price:sort==='rating'?b.rating-a.rating:Number(b.popular)-Number(a.popular))
  return <div className="inner-page"><div className="page-intro"><span className="eyebrow">MADE FRESH, JUST FOR YOU</span><h1>Explore the <span>menu.</span></h1><p>From comfort-food classics to fresh new favorites, find your next delicious thing.</p></div>
    <div className="menu-toolbar"><div className="search-box menu-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes or restaurants..."/></div><label className="sort-select"><SlidersHorizontal size={17}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">Recommended</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
    <div className="category-list menu-categories">{categories.map(c=><button key={c.id} className={category===c.id?'category-pill selected':'category-pill'} onClick={()=>setCategory(c.id)}><span>{c.emoji}</span>{c.name}</button>)}</div>
    <div className="results-caption"><strong>{filtered.length} delicious choices</strong><span>Prices include applicable taxes at checkout</span></div>
    <div className="food-grid">{filtered.map(food=><FoodCard key={food.id} food={food} onCustomize={setCustomFood}/>)}</div>
    {filtered.length===0&&<div className="empty-state"><span>🍜</span><h3>Nothing on the menu</h3><p>Try a different search or category.</p></div>}
    <CustomizeModal food={customFood} onClose={()=>setCustomFood(null)}/>
  </div>
}