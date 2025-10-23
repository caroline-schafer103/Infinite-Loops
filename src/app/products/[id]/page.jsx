import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

async function getProduct(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const url = `${baseUrl}/api/products?id=${id}`;
  console.log("Fetching product from URL:", url);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch product. Status:", res.status);
    throw new Error("Failed to fetch product");
  }

  const products = await res.json();
  console.log("Fetched products:", products);
  return Array.isArray(products) ? products[0] : products;
}


export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
