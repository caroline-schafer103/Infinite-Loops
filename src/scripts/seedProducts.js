import mongoose from "mongoose";
import Product from "../models/Product.js";
import { products } from "../data/products.js"; // wherever your old data lives

const MONGODB_URI = "mongodb+srv://cschafer103:NoahandJude02@infiniteloops.wo1qwji.mongodb.net/?retryWrites=true&w=majority&appName=InfiniteLoops";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Transform nested structure into flat list with category
    const allProducts = Object.entries(products).flatMap(([category, items]) =>
      items.map((item) => ({
        ...item,
        category,
      }))
    );

    await Product.insertMany(allProducts);
    console.log("✅ Products seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding products:", err);
  }
}

seed();
