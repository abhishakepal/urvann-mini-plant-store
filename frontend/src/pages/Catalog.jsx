import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import PlantCard from '../components/PlantCard'
import Filters from '../components/Filters'
import { API_URL } from '../api'

function fetchPlants(params) {
  const searchParams = new URLSearchParams(params)
  return axios.get(`${API_URL}/api/plants?` + searchParams.toString()).then(r => r.data)
}

export default function Catalog() {
  const [params, setParams] = useState({ page: 1, limit: 12, sort: 'createdAt:desc' })

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['plants', params],
    queryFn: () => fetchPlants(params)
  })

  const onFilterChange = useCallback((patch) => {
    setParams(prev => ({ ...prev, ...patch, page: 1 }))
  }, [])

  const page = data?.page || 1
  const pages = data?.pages || 1

  return (
    <div className="space-y-4">
      <Filters onChange={onFilterChange} />
      {isFetching && <div className="text-sm text-gray-500">Loading plants...</div>}
      {isError && <div className="text-sm text-red-600">Failed to load plants.</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.items?.map(p => <PlantCard key={p._id} plant={p} />)}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">Page {page} of {pages}</div>
        <div className="flex gap-2">
          <button
            onClick={() => setParams(prev => ({ ...prev, page: Math.max(1, page - 1) }))}
            disabled={page <= 1}
            className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setParams(prev => ({ ...prev, page: Math.min(pages, page + 1) }))}
            disabled={page >= pages}
            className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
