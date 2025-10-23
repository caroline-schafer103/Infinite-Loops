"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, variantId, quantity) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.variantId === variantId
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, variantId, quantity }];
    });
  };

  const removeFromCart = (productId, variantId) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.variantId === variantId)
      )
    );
  };

  // ✅ NEW: update quantity directly
  const updateQuantity = (productId, variantId, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variantId === variantId
          ? { ...item, quantity: Math.max(newQuantity, 1) } // never allow 0 or negative
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
