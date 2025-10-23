import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products?id=${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  const products = await res.json();

  // If the API returns a list, pick the first (matching) product
  return Array.isArray(products) ? products[0] : products;
}


export default async function ProductPage({ params }) {
  const { id } = params; 
  const product = await getProduct(id);
  console.log("Fetched product:", product);


  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
