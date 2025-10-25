"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Hero from "@/components/ui/Hero";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Slugs (or IDs) for featured products
  const featuredSlugs = [
    "flower-coaster",
    "spooky-ghost-tapestry",
    "solid-bucket-hat",
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // Filter featured products by slug or fallback to ID
        const filtered = data.filter((p) =>
          featuredSlugs.includes(p.slug || p.id)
        );
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#2F855A]">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => {
              const productImage =
                p.images?.[0] ||
                p.variants?.[0]?.images?.[0] ||
                "https://via.placeholder.com/400x400?text=No+Image";

              return (
                <Link
                  key={p._id}
                  href={`/products/${p.id}`} // or `/products/${p.slug}` if you prefer slug routes
                  className="block group"
                >
                  <Card className="p-4 border rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="w-full h-48 bg-gray-200 rounded mb-4 overflow-hidden">
                      <img
                        src={productImage}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#2F855A] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-gray-600">${p.price.toFixed(2)}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
