import { useEffect, useMemo, useState } from 'react'
import { api, parseEscapedCommaLocation } from '@/lib/api'

type Person = {
  id: string | number
  name: string
  email?: string
  role?: string
  location?: string
}

type Paginated<T> = {
  page: number
  totalPages: number
  data: T[]
}

export default function TablePage() {
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [people, setPeople] = useState<Person[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError('')
    api
      .get(page ? `/get-people-list?page=${page}` : '/get-people-list')
      .then((res) => {
        if (!mounted) return
        const body = res.data
        if (Array.isArray(body)) {
          setPeople(body)
          setTotalPages(1)
        } else if (body && Array.isArray(body.data)) {
          setPeople(body.data)
          setTotalPages(body.totalPages || 1)
        } else {
          setPeople([])
          setTotalPages(1)
        }
      })
      .catch((err) => setError(err?.message || 'Failed to load people'))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [page])

  const rows = useMemo(
    () =>
      people.map((p) => ({
        ...p,
        location: parseEscapedCommaLocation(p.location),
      })),
    [people],
  )

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-gray-600" colSpan={4}>Loading…</td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="px-4 py-6 text-red-600" colSpan={4}>{error}</td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-600" colSpan={4}>No data</td>
                </tr>
              ) : (
                rows.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.email || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.role || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.location || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1 || loading}
        >
          Previous
        </button>
        <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
        <button
          className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          onClick={() => setPage((p) => (totalPages ? Math.min(totalPages, p + 1) : p + 1))}
          disabled={loading || (totalPages ? page >= totalPages : false)}
        >
          Next
        </button>
      </div>
    </div>
  )
}


