"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";

export default function ProductDetailClient({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(null); // no variant selected initially
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // show first product image
  const [quantity, setQuantity] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userClickedThumbnail, setUserClickedThumbnail] = useState(false); // priority flag

  const variant = product.variants?.find((v) => v.id === selectedVariant);

  // Merge all thumbnails: product images first, then variant images if not duplicates
  const thumbnails = [...(product.images || [])];
  product.variants?.forEach((v) => {
    v.images?.forEach((img) => {
      if (!thumbnails.includes(img)) thumbnails.push(img);
    });
  });

  // Jump to variant image when selected, only if user hasn't manually clicked a thumbnail
  useEffect(() => {
    if (!selectedVariant || userClickedThumbnail) return;

    const selectedVariantObj = product.variants.find(
      (v) => v.id === selectedVariant
    );
    if (selectedVariantObj?.images?.length) {
      const variantIndex = thumbnails.findIndex(
        (img) => img === selectedVariantObj.images[0]
      );
      if (variantIndex >= 0) setCurrentImageIndex(variantIndex);
    }
  }, [selectedVariant, thumbnails, product.variants, userClickedThumbnail]);

  // Reset quantity when variant changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!variant || variant.inventory <= 0) {
      toast.error("This variant is out of stock.");
      return;
    }
    addToCart(product, selectedVariant, quantity);
    toast.success(`${product.name} added to cart!`, {
      description: `Quantity: ${quantity}`,
    });
  };

  const outOfStock = variant && variant.inventory <= 0;

  return (
    <section className="max-w-5xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left: Images */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2">
          {thumbnails.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                index === currentImageIndex
                  ? "border-[#2F855A]"
                  : "border-gray-300"
              }`}
              onClick={() => {
                setCurrentImageIndex(index);
                setUserClickedThumbnail(true); // user clicks take priority
              }}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 w-full h-96 bg-gray-200 rounded-lg shadow overflow-hidden">
          <img
            src={thumbnails[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-center space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-green-700 font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600">
          {product.description || "Handmade crochet piece."}
        </p>

        {/* Variant selector */}
        {product.variants?.length > 0 && (
          <div>
            <p className="block mb-2 font-medium">Choose a color:</p>
            <div className="flex flex-wrap gap-4">
              {[...product.variants]
                .sort((a, b) => {
                  const aOut = a.inventory === 0;
                  const bOut = b.inventory === 0;
                  if (aOut === bOut) return 0;
                  return aOut ? 1 : -1; // move out-of-stock to the end
                })
                .map((v) => {
                  const isSelected = selectedVariant === v.id;

                  let backgroundStyle;
                  if (Array.isArray(v.color)) {
                    if (v.color.length === 2) {
                      backgroundStyle = {
                        background: `linear-gradient(135deg, ${v.color[0]} 50%, ${v.color[1]} 50%)`,
                      };
                    } else if (v.color.length === 1) {
                      backgroundStyle = { backgroundColor: v.color[0] };
                    } else {
                      backgroundStyle = { backgroundColor: "#ccc" };
                    }
                  } else if (typeof v.color === "string") {
                    backgroundStyle = { backgroundColor: v.color };
                  } else {
                    backgroundStyle = { backgroundColor: "#ccc" };
                  }

                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setSelectedVariant(v.id);
                        setUserClickedThumbnail(false);
                      }}
                      className="w-10 h-10 rounded-full border-2 transition-all hover:scale-110 cursor-pointer"
                      style={{
                        ...backgroundStyle,
                        borderColor: isSelected ? "#2F855A" : "#D1D5DB",
                        opacity: v.inventory === 0 ? 0.4 : 1,
                      }}
                      disabled={v.inventory === 0}
                      aria-label={v.name}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div>
          <label htmlFor="quantity" className="block mb-2 font-medium">
            Quantity:
          </label>
          <div className="relative w-24">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="border rounded px-3 py-2 w-full text-left cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-600"
              disabled={!variant || variant.inventory === 0}
            >
              {quantity}
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full max-h-32 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg">
                {variant && variant.inventory > 0 ? (
                  Array.from({ length: variant.inventory }, (_, i) => i + 1).map(
                    (num) => (
                      <li
                        key={num}
                        onClick={() => {
                          setQuantity(num);
                          setDropdownOpen(false);
                        }}
                        className={`px-3 py-1 hover:bg-green-100 cursor-pointer ${
                          num === quantity ? "bg-green-50 font-medium" : ""
                        }`}
                      >
                        {num}
                      </li>
                    )
                  )
                ) : (
                  <li className="px-3 py-1 text-gray-500">0</li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="lg"
          className={`${
            outOfStock
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2F855A] hover:bg-[#276746] cursor-pointer"
          } text-white px-6 py-3 rounded-lg transition-all`}
          onClick={handleAddToCart}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </section>
  );
}
