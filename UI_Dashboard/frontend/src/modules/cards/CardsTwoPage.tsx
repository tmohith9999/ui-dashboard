import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

type Product = {
  id: string | number
  name: string
  category?: string
  price?: number
  rating?: number
  image?: string
}

export default function CardsTwoPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError('')
    api
      .get('/get-products')
      .then((res) => {
        if (!mounted) return
        const data = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        setProducts(data)
      })
      .catch((err) => {
        setError(err?.message || 'Failed to load products')
      })
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="text-gray-600">Loading products…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <div key={p.id} className="card overflow-hidden">
          {p.image ? (
            <img src={p.image} alt={p.name} className="h-36 w-full object-cover" />
          ) : (
            <div className="h-36 w-full bg-gray-100" />
          )}
          <div className="p-4">
            <div className="text-sm text-gray-500">{p.category || 'Product'}</div>
            <div className="mt-1 font-semibold text-gray-900 truncate">{p.name}</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-brand-700 font-medium">{p.price ? `$${p.price.toFixed(2)}` : '—'}</div>
              <div className="text-xs text-gray-500">{p.rating ? `★ ${p.rating.toFixed(1)}` : 'No rating'}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


