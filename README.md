## 🌳Urvann – Mini Plant Store (MERN)

This project is a full-stack mini e-commerce application built for the Urvann Software Development Intern assignment. It allows users to browse a catalog of plants, search and filter them, and provides an admin panel for adding new plants.

---

## 💻Tech Stack
- **Frontend:** React (Vite), Tailwind, React Router, TanStack Query, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Zod, CORS, Morgan
- **DB:** MongoDB Atlas
- **Deploy:** Netlify (frontend) + Render (backend)

---

## 📋Key Features
- **Plant Catalog:** Displays a list of over 50 plants from a pre-populated database, showing their name, price, categories, and stock availability.

- **Search & Filter:** Users can search for plants by name (case-insensitive) and filter by categories like 'Indoor', 'Outdoor', and 'Succulent'.

- **Add Plant (Admin):** A form with input validation to securely add new plants to the database.

- **Responsive UI:** The application's UI is designed to be fully responsive and works well on both desktop and mobile devices.

- **Code Quality:** The project uses functional React components, hooks, and a clean, modular structure.

---

## 🚀 Getting Started
To run this project locally, follow these steps:

### Backend Setup
1. Navigate to the backend/ directory and install dependencies:

```bash
cd backend/
npm install
```

2. Create a .env file from the example and add your MongoDB URI.

3. Run the seed script to populate the database:

```bash
npm run seed
```

4. Start the backend server:

```bash
npm start
```

### Frontend Setup
1. Navigate to the frontend/ directory and install dependencies:

```bash
cd frontend/
npm install
```

2. Create a .env file from the example and add your backend's deployed URL.

3. Start the frontend development server:

```bash
npm run dev
```

## ⚙️API

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

## 🌐 Deployment
### Frontend: Deployed on Netlify.

**🔗Live Link:** https://urvann-mini-plantstore.netlify.app/

### Backend: Deployed on Render.

**🔗Live Link:** https://urvann-backend-pkx2.onrender.com/
