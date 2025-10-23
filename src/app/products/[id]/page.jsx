import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

async function getProduct(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  const products = await res.json();
  return Array.isArray(products) ? products[0] : products;
}

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
