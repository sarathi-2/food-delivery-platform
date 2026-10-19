# Crave — Food Delivery Platform

A responsive React + Vite food delivery frontend with Tailwind CSS, React Router, Context API, Framer Motion, and LocalStorage persistence.

## Features
- Responsive home page with hero, food categories, offers, restaurants, and search.
- Menu browsing, category filters, sorting, favorites UI, and food customization modal.
- Persistent cart with quantity updates, remove actions, coupon code (`CRAVE20`), delivery fee, taxes, and totals.
- Checkout form with validation for name, Indian mobile number, address, city, and PIN code.
- Demo order confirmation, order status timeline, progress preview, and order history.
- Reusable components and Context API cart state.

## Run locally
Requirements: Node.js 18+

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Notes
- Checkout is a frontend demo; no real payment is processed.
- Orders and cart are stored in browser LocalStorage.
- Food photos are loaded from Unsplash, so images need an internet connection.
- Coupon `CRAVE20` applies a 20% discount to the cart subtotal.
