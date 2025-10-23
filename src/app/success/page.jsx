"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-8">
        Thank you for your order! You’ll receive a confirmation email soon.
      </p>
      <Link
        href="/"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
