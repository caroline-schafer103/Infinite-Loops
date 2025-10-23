"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-white shadow-md z-50">
      {/* Logo + name */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <span className="font-bold text-lg md:text-xl">Infinite Loops</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-10 font-medium text-gray-700 absolute left-1/2 transform -translate-x-1/2">
        <Link href="/about" className="hover:text-gray-900">
          About
        </Link>
        <Link href="/products" className="hover:text-gray-900">
          Products
        </Link>
        <Link href="/contact" className="hover:text-gray-900">
          Contact
        </Link>
      </nav>

      {/* Right Side: Search, Cart, Menu */}
      <div className="flex items-center gap-3">


        {/* Cart */}
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

        {/* Mobile Menu Toggle (only on small screens) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-md md:hidden">
          <nav className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-900"
            >
              Products
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-900"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
