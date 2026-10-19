export const categories = [
  { id: 'all', name: 'All food', emoji: '🍽️' },
  { id: 'burger', name: 'Burgers', emoji: '🍔' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'asian', name: 'Asian', emoji: '🍜' },
  { id: 'salad', name: 'Healthy', emoji: '🥗' },
  { id: 'dessert', name: 'Desserts', emoji: '🍰' },
]

export const restaurants = [
  { id: 1, name: 'Burger Boulevard', cuisine: 'American · Burgers', rating: '4.8', time: '20–30 min', fee: 'Free delivery', tag: 'BEST SELLER', color: 'orange', image: 'photo-1568901346375-23c9450c58cd' },
  { id: 2, name: 'Forno & Figli', cuisine: 'Italian · Pizza', rating: '4.9', time: '25–35 min', fee: '₹20 delivery', tag: 'POPULAR', color: 'red', image: 'photo- pizza' },
  { id: 3, name: 'Wok This Way', cuisine: 'Asian · Noodles', rating: '4.7', time: '15–25 min', fee: 'Free delivery', tag: 'QUICK BITE', color: 'green', image: 'photo- noodles' },
  { id: 4, name: 'Green Fork', cuisine: 'Healthy · Bowls', rating: '4.6', time: '20–30 min', fee: '₹15 delivery', tag: 'FRESH PICK', color: 'green', image: 'photo-1512621776951-a57141f2eefd' },
]

export const foods = [
  { id: 101, name: 'Smash Classic Burger', restaurant: 'Burger Boulevard', category: 'burger', price: 249, rating: 4.9, description: 'Double smash patty, cheddar, pickles and our signature sauce.', image: 'photo-1568901346375-23c9450c58cd', popular: true, options: ['Add cheese', 'Extra patty', 'No onions'] },
  { id: 102, name: 'Crispy Chicken Burger', restaurant: 'Burger Boulevard', category: 'burger', price: 289, rating: 4.8, description: 'Crispy chicken, crunchy lettuce and pepper mayo.', image: 'photo-1606755962773-d324e0a13086', popular: false, options: ['Extra sauce', 'Add cheese', 'No mayo'] },
  { id: 103, name: 'Margherita Pizza', restaurant: 'Forno & Figli', category: 'pizza', price: 329, rating: 4.8, description: 'Wood-fired crust, fresh basil and creamy mozzarella.', image: 'photo-1574071318508-1cdbab80d002', popular: true, options: ['Extra cheese', 'Thin crust', 'Chilli flakes'] },
  { id: 104, name: 'Pepperoni Pizza', restaurant: 'Forno & Figli', category: 'pizza', price: 399, rating: 4.9, description: 'Classic pepperoni with a golden, bubbly cheese finish.', image: 'photo-1628840042765-356cda07504e', popular: false, options: ['Extra pepperoni', 'Thin crust', 'Extra cheese'] },
  { id: 105, name: 'Spicy Miso Ramen', restaurant: 'Wok This Way', category: 'asian', price: 319, rating: 4.7, description: 'Rich miso broth, springy noodles, corn and soft egg.', image: 'photo-1569718212165-3a8278d5f624', popular: true, options: ['Extra spicy', 'Add egg', 'No spring onion'] },
  { id: 106, name: 'Sesame Noodle Bowl', restaurant: 'Wok This Way', category: 'asian', price: 269, rating: 4.6, description: 'Wok-tossed noodles, sesame, greens and a savory glaze.', image: 'photo-1569718212165-3a8278d5f624', popular: false, options: ['Extra veggies', 'Add tofu', 'Extra spicy'] },
  { id: 107, name: 'Harvest Power Bowl', restaurant: 'Green Fork', category: 'salad', price: 299, rating: 4.7, description: 'Avocado, quinoa, greens, roasted chickpeas and tahini.', image: 'photo-1512621776951-a57141f2eefd', popular: true, options: ['Add avocado', 'Dressing on side', 'Add tofu'] },
  { id: 108, name: 'Berry Cheesecake', restaurant: 'Sweet Moment', category: 'dessert', price: 189, rating: 4.8, description: 'Silky cheesecake topped with fresh seasonal berries.', image: 'photo-1533134242443-d4fd215305ad', popular: false, options: ['Extra berries', 'No topping'] },
]

export const imageUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`