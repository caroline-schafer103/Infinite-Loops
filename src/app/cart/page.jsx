"use client";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.product.id,
            variantId: item.variant?.id || null,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.variant?.images?.[0] || item.product.images?.[0] || "",
          })),
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {cart.map((item) => (
              <li key={item.product.id}>
                {item.product.name} — ${item.product.price} × {item.quantity}
              </li>
            ))}
          </ul>
          <Button
            onClick={handleCheckout}
            className="bg-black text-white px-4 py-2 rounded mt-6"
          >
            Checkout
          </Button>
        </>
      )}
    </div>
  );
}
