"use client";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#E8FFF1] via-[#D6FFE4] to-[#C4FFDA] py-20 px-6">
      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-6">Your cart is currently empty.</p>
            <Link
              href="/products"
              className="inline-block bg-[#2F855A] hover:bg-[#38A169] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-8">
              {cart.map((item) => (
                <li
                  key={`${item.product.id}-${item.variant?.id || "default"}`}
                  className="flex flex-col md:flex-row items-center gap-6 py-6"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={
                        item.variant?.images?.[0] ||
                        item.product.images?.[0] ||
                        "https://via.placeholder.com/100"
                      }
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product.name}
                    </h2>
                    {item.variant?.name && (
                      <p className="text-sm text-gray-500">
                        {item.variant.name}
                      </p>
                    )}
                    <p className="mt-2 text-gray-700">
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <div className="text-lg font-semibold text-[#2F855A]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            {/* Cart Summary */}
            <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6">
              <p className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                Total:{" "}
                <span className="text-[#2F855A]">${total.toFixed(2)}</span>
              </p>
              <Button
                onClick={handleCheckout}
                className="bg-[#2F855A] hover:bg-[#38A169] text-white font-bold px-8 py-3 rounded-lg shadow-md transform hover:scale-105 transition-all cursor-pointer"
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
