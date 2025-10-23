"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("Sending...")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus("✅ Message sent successfully!")
        setForm({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (err) {
      console.error(err)
      setStatus("❌ Failed to send message.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E8FFF1] via-[#D6FFE4] to-[#C4FFDA] flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
          Contact Me
        </h1>
        <p className="text-center text-gray-700 mb-12 text-lg">
          Have a question or want a custom crochet order? Send me a message below!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-2 text-gray-800">Name</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="border-green-300 focus:border-green-500 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-800">Email</label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="border-green-300 focus:border-green-500 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-800">Message</label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your idea or question..."
              rows={5}
              required
              className="border-green-300 focus:border-green-500 focus:ring-green-200"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2F855A] hover:bg-[#38A169] text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all cursor-pointer"
          >
            Send Message
          </Button>

          {status && (
            <p className="text-center mt-4 font-medium text-gray-800">{status}</p>
          )}
        </form>
      </div>
    </div>
  )
}
