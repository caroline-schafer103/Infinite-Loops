import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

async function getProduct(id) {
  // Use a relative path so it works in both local + production environments
  const res = await fetch(`/api/products?id=${id}`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch product");

  const products = await res.json();

  // If the API returns an array, return the first product
  return Array.isArray(products) ? products[0] : products;
}

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
