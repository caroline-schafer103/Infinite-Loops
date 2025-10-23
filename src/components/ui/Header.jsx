"use client";

import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const { cart } = useCart();

  // Count total quantity (not just number of unique items)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="relative flex items-center px-8 py-4 bg-white shadow-md">
      {/* Logo + name */}
      <Link href="/" className="flex items-center gap-3 z-10 cursor-pointer">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <span className="font-bold text-xl">Infinite Loops</span>
      </Link>

      {/* Nav */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-30 font-medium text-gray-700">
        <Link href="/about" className="hover:text-gray-900 cursor-pointer">
          About
        </Link>
        <Link href="/products" className="hover:text-gray-900 cursor-pointer">
          Products
        </Link>
        <Link href="/contact" className="hover:text-gray-900 cursor-pointer">
          Contact
        </Link>
      </nav>

      {/* Search + Cart */}
      <div className="ml-auto flex items-center gap-4 z-10">
        <Button asChild variant="ghost" className="p-2 rounded-full relative">
          <Link href="/search">
            <Search className="w-5 h-5 text-gray-700" />
          </Link>
        </Button>

        <Button asChild variant="ghost" className="p-2 rounded-full relative">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </header>
  );
}
