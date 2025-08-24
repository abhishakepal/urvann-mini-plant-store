import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-semibold">🌿 Urvann Mini Plant Store</div>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className={({isActive}) => isActive ? 'text-green-700 font-medium' : 'text-gray-700 hover:text-green-700'}>Catalog</NavLink>
            <NavLink to="/admin" className={({isActive}) => isActive ? 'text-green-700 font-medium' : 'text-gray-700 hover:text-green-700'}>Add Plant</NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 text-center">
          Urvann is your one-stop online nursery for plants, planters, gardening accessories, and tools. Order fresh plants and get free home delivery on the next day!
          <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500">
          All rights reserved @Abhishek Pal
          </div>
        </div>
      </footer>
    </div>
  )
}
