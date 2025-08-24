import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import Catalog from './pages/Catalog.jsx'
import Admin from './pages/Admin.jsx'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Catalog /> },
    { path: 'admin', element: <Admin /> }
  ]}
])

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
