"use client"

import { useEffect, useState } from "react"

type Ward = {
  id: string
  name: string
  capacity: number
  occupied: number
}

export default function WardsPage() {
  const [wards, setWards] = useState<Ward[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const res = await fetch('/api/wards')
        if (!res.ok) throw new Error('Failed to load wards')
        const data = await res.json()
        setWards(data)
      } catch (e: any) {
        setError(e?.message || 'Error loading wards')
      } finally {
        setLoading(false)
      }
    }
    fetchWards()
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">Wards</h1>
        <p className="text-sm text-gray-600">Occupancy by unit, updated hourly.</p>

        {loading && <div className="mt-6 text-sm text-gray-600">Loading wards…</div>}
        {error && <div className="mt-6 text-sm text-red-600">{error}</div>}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wards.map((w) => {
            const pct = Math.min(100, Math.round((w.occupied / w.capacity) * 100))
            return (
              <div key={w.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{w.name}</div>
                  <div className="text-sm text-gray-600">{w.occupied}/{w.capacity}</div>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-600 rounded"
                    style={{ width: pct + "%" }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-700">{pct}% occupied</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}