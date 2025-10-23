"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="mb-8">No worries — your cart is still saved.</p>
      <Link
        href="/cart"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Go Back to Cart
      </Link>
    </main>
  );
}
