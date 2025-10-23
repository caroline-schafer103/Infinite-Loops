import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");

    let products;
    if (id) {
      // Return a single product by its "id" field
      products = await Product.findOne({ id });
    } else if (category) {
      // Return products filtered by category
      products = await Product.find({ category });
    } else {
      // Return all products
      products = await Product.find({});
    }

    return NextResponse.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
