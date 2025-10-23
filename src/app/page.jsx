"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Hero from "@/components/ui/Hero"

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Add product IDs or names you want to feature here:
  const selectedProductIds = [
    "68f9142fa5832eefcc85e834", // example MongoDB ObjectId
    "68f9142fa5832eefcc85e878",
    "68f9142fa5832eefcc85e856",
  ]

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()

        // Filter only specific ones
        const filtered = data.filter((p) => selectedProductIds.includes(p._id))
        setProducts(filtered)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex flex-col items-center">
                  <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-center">{product.name}</h2>
                  <p className="text-gray-600 mb-4">${product.price?.toFixed(2)}</p>
                  <Button asChild>
                    <a href={`/products/${product._id}`}>View</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
