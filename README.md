# Urvann – Mini Plant Store (MERN)

A fast, minimal MERN app that lists plants with search & filters, and includes an Admin form to add plants. Built for the Urvann assignment.

# Tech
- **Frontend:** React (Vite), Tailwind, React Router, TanStack Query, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Zod, CORS, Morgan
- **DB:** MongoDB Atlas (recommended)
- **Deploy:** Vercel (frontend) + Render/Railway (backend)

# Features
- Catalog grid with name, price, categories (chips), stock status, optional image
- Search by plant name **or** category keyword (case-insensitive)
- Filter by category (dropdown) and stock
- Pagination + sorting hooks
- Admin form with client + server validation
- Loading and error states
- Seed script with 50+ realistic plants

---

# Local Setup

## 1) Backend
```bash
cd backend
cp .env.example .env  # set MONGODB_URI
npm install
npm run seed          # seeds 50 plants
npm run dev           # starts http://localhost:4000
```

## 2) Frontend
```bash
cd frontend
cp .env.example .env  # set VITE_API_URL pointing to backend
npm install
npm run dev           # starts http://localhost:5173
```

Open http://localhost:5173

---

## API

- `GET /api/plants?search=&category=&inStock=&page=1&limit=12&sort=price:asc`
- `GET /api/plants/categories` → distinct categories
- `POST /api/plants` → add a plant (admin)

**Body (POST /api/plants)**
```json
{
  "name": "Money Plant",
  "price": 299,
  "categories": ["Indoor", "Home Decor"],
  "inStock": true,
  "image": "https://..."
}
```

---

## Deployment Tips

### Backend (Render example)
1. Push repo to GitHub
2. Create a new **Web Service** on Render from the `backend` folder
3. Build command: `npm install`
4. Start command: `npm start`
5. Env vars: `MONGODB_URI`, `PORT` (Render provides), optional `NODE_VERSION`
6. Post-deploy: run a one-off job `npm run seed`

### Frontend (Vercel example)
1. Import repo on Vercel
2. Set **Root Directory** to `frontend`
3. Env var: `VITE_API_URL` → your Render backend URL
4. Build command: `npm run build`
5. Output dir: `dist`

---

## Extra Ideas (Optional)
- Sort dropdown (price low→high, high→low, newest)
- Infinite scroll
- Category multi-select chips
- Add images from a CDN
- Simple auth for admin
- E2E tests with Playwright or Cypress

Good luck! ✨
