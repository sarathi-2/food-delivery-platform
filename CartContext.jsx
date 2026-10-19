import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'crave-cart-v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (food, quantity = 1, options = []) => {
    const key = `${food.id}-${[...options].sort().join('|')}`
    setItems(current => {
      const found = current.find(item => item.key === key)
      if (found) return current.map(item => item.key === key ? { ...item, quantity: item.quantity + quantity } : item)
      return [...current, { ...food, key, quantity, selectedOptions: options }]
    })
  }
  const updateQuantity = (key, quantity) => setItems(current => quantity < 1 ? current.filter(i => i.key !== key) : current.map(i => i.key === key ? { ...i, quantity } : i))
  const removeItem = key => setItems(current => current.filter(i => i.key !== key))
  const clearCart = () => setItems([])
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const value = useMemo(() => ({ items, addItem, updateQuantity, removeItem, clearCart, count, subtotal }), [items, count, subtotal])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}