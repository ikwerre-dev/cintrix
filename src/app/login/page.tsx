"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const base = "https://mediflow-backend.vercel.app"
      const res = await fetch(`${base}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      console.log(data)
      if (!res.ok) throw new Error(data.message || data.error || "Login failed")
      if (data.token) {

        try {
          document.cookie = `auth-token=${data.token}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`
          localStorage.setItem("auth-token", data.token)
          if (data.user?.role) {
            localStorage.setItem("user-role", String(data.user.role))
          }
        } catch {}
      }
      const role = String(data.user?.role || '').toLowerCase()
      if (role === 'admin') {
        router.push('/admin')
      } else if (role === 'doctor') {
        router.push('/dashboard/doctors')
      } else {
        router.push('/dashboard')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-[#194dbe] relative">
        <div className="absolute inset-0 bg-[#194dbe] opacity-90"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <h1 className="text-3xl font-bold mb-6">Staff Access</h1>
          <p className="text-xl mb-8 max-w-md text-center">Sign in to manage triage, queue status, staffing, and wards.</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 md:hidden">
            <img src="/logo.png" alt="Clintrix ES Logo" width={160} height={50} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in to Clintrix ES</h2>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <button className="w-full bg-[#194dbe] text-white py-3 rounded-lg hover:bg-opacity-90 transition-all" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Accounts are created by Admin.</p>
          </div>
        </div>
      </div>
    </div>
  )
}