import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../api'

export default function Admin() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    categories: '',
    inStock: true,
    image: ''
  })
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', msg: '' })

    // basic validations
    if (!form.name.trim() || form.name.trim().length < 2) {
      return setStatus({ type: 'error', msg: 'Name is required (min 2 chars)' })
    }
    const price = Number(form.price)
    if (Number.isNaN(price) || price < 0) {
      return setStatus({ type: 'error', msg: 'Price must be a non-negative number' })
    }
    const categories = form.categories.split(',').map(s => s.trim()).filter(Boolean)
    if (categories.length < 1) {
      return setStatus({ type: 'error', msg: 'Add at least one category (comma separated)' })
    }

    try {
      setLoading(true)
      const payload = { name: form.name.trim(), price, categories, inStock: !!form.inStock, image: form.image.trim() }
      const res = await axios.post(`${API_URL}/api/plants`, payload)
      setStatus({ type: 'success', msg: 'Plant added!' })
      setForm({ name: '', price: '', categories: '', inStock: true, image: '' })
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to add plant'
      setStatus({ type: 'error', msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-white border rounded-2xl p-4 space-y-3">
        <div className="text-lg font-medium">Add Plant (Admin)</div>
        <div className="grid gap-2">
          <label className="text-sm">Name</label>
          <input
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g., Money Plant"
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Price (₹)</label>
          <input
            type="number"
            step="1"
            min="0"
            value={form.price}
            onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g., 299"
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Categories (comma separated)</label>
          <input
            value={form.categories}
            onChange={e => setForm(prev => ({ ...prev, categories: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Indoor, Home Decor"
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Image URL (optional)</label>
          <input
            value={form.image}
            onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="https://..."
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="inStock"
            type="checkbox"
            checked={form.inStock}
            onChange={e => setForm(prev => ({ ...prev, inStock: e.target.checked }))}
          />
          <label htmlFor="inStock" className="text-sm">In Stock</label>
        </div>

        <button
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Plant'}
        </button>

        {status.msg && (
          <div className={"text-sm " + (status.type === 'error' ? 'text-red-600' : 'text-green-700')}>
            {status.msg}
          </div>
        )}
      </form>

      <div className="text-xs text-gray-500 mt-3">
        Validation runs on both frontend and backend (Zod). Use real categories like Indoor, Outdoor, Succulent, Air Purifying, Home Decor, etc.
      </div>
    </div>
  )
}
