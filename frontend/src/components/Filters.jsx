import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../api'

export default function Filters({ onChange }) {
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [inStock, setInStock] = useState('')

  useEffect(() => {
    axios.get(`${API_URL}/api/plants/categories`).then(res => {
      setCategories(res.data || [])
    }).catch(() => setCategories([]))
  }, [])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      onChange({ search, category, inStock })
    }, 400)
    return () => clearTimeout(t)
  }, [search, category, inStock, onChange])

  return (
    <div className="bg-white border rounded-2xl p-3 md:p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
        placeholder="Search by name or category keyword..."
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select
        value={inStock}
        onChange={e => setInStock(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Stock: All</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>
      <div className="text-sm text-gray-500 grid place-items-center">
        Tip: Use the search box for keywords like "home decor" or "succulent"
      </div>
    </div>
  )
}
