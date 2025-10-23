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
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Me</h1>
      <p className="text-center text-gray-600 mb-12">
        Have a question or want a custom crochet order? Send me a message below!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <Textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your idea or question..."
            rows={5}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>

        {status && (
          <p className="text-center mt-4 text-gray-700 font-medium">{status}</p>
        )}
      </form>
    </div>
  )
}
