# Product Catalog App

A product catalog built for the Neurogine Junior Mobile Developer assessment, using the DummyJSON API.

## Stack
React Native (Expo, TypeScript)

## How to run
'''
npm install
npx expo start
'''

Press `i` for iOS simulator, `w` for web, or scan the QR code with Expo Go on your phone.

Run tests:
'''
npm test
​'''

## Features
- Product list with thumbnail, title, and price
- Pagination — loads 20 more products using `skip` when scrolling near the bottom
- Product detail popup — [describe in your own words how it looks: main image, description, rating, price, round thumbnail gallery]
- Category browser — main categories expand to show subcategories, tap one to filter the grid
- States: loading (skeleton grid), error (message + Retry button), empty (message + Clear search), success
- Debounced search (400ms)
- Bonus: pull-to-refresh, image loading placeholder/error fallback, unit tests, add-to-bag icon (visual only)

## Architecture
​```

  data/     API calls and TypeScript types — the only files that call fetch
  hooks/    state and business logic (pagination, search, category filtering, detail loading)
  ui/       screens and presentational components
  utils/    formatting helpers (price, star rating)
  theme/    colors and spacing
​​'''

[Write 2-3 sentences in your own words about why you split it this way — e.g. "UI components never call fetch directly, they only use hooks, which keeps..."]

## Decisions when search
- **Search:** [say whether you used server-side or client-side search, and why — you chose server-side via `/products/search` since only a fraction of products are loaded at once]
- **Categories:** DummyJSON's categories are flat, so I grouped them into my own main categories (Beauty, Electronics, Fashion, Home, Other) to build a two-level menu.
- [Any other decision you're proud of or want to explain]

## AI usage
[Be specific and honest. Example: "I used Claude to draft the initial architecture and some files, and to help debug issues in useProducts.ts and CategoryMenu.tsx. I reviewed, tested, and can explain all code in the walkthrough video."]

## Not finished / TODO
- Add-to-bag button is visual only, doesn't add to a cart
- Search and category filter can't be combined at the same time
- Pull-to-refresh doesn't work on web, only native
- Logo 
- image placeholder more eye catching
- payments part
- customer service part 
- Ai chatbots for enquiry of products 
- cart page 
