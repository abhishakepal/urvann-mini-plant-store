import React from 'react'

export default function PlantCard({ plant }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col">
      <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-3 overflow-hidden">
        {plant.image ? (
          <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400 text-sm">No Image</div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium">{plant.name}</div>
        <div className="text-sm text-gray-600 mt-1">₹{plant.price}</div>
        <div className="flex flex-wrap gap-1 mt-2">
          {plant.categories.map((c) => (
            <span key={c} className="text-[10px] px-2 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 text-xs">
        {plant.inStock ? <span className="text-green-700">In Stock</span> : <span className="text-red-600">Out of Stock</span>}
      </div>
    </div>
  )
}
