"use client"

import { useState } from "react"

type ChatMessage = { role: "user" | "assistant"; content: string }

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    const text = input.trim()
    if (!text) return
    setInput("")
    const next = [...messages, { role: "user", content: text }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          system: "You are Clintrix ES assistant helping hospital operations.",
          messages: next,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setMessages([...next, { role: "assistant", content: "Error: " + (err?.message || "request failed") }])
      } else {
        const data = await res.json()
        const content = Array.isArray(data?.content) ? data.content.map((c: any) => c?.text).filter(Boolean).join("\n") : ""
        setMessages([...next, { role: "assistant", content: content || "(no response)" }])
      }
    } catch (e) {
      setMessages([...next, { role: "assistant", content: "Internal error" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">Clintrix ES AI Assistant</h1>
        <p className="text-sm text-gray-600">Ask about bed flow, staffing, or triage policies.</p>

        <div className="mt-6 border border-gray-200 rounded-md">
          <div className="p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-sm text-gray-500">Start the conversation below.</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.role === "user" ? "text-gray-900" : "text-gray-800"}`}>
                <span className="font-medium">{m.role === "user" ? "You" : "Assistant"}:</span> {m.content}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-60"
            >
              {loading ? "Sending" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}