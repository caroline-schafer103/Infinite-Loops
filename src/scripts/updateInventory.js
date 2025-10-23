// src/scripts/updateInventory.js
import connectDB from "../lib/mongodb.js";
import Product from "../models/Product.js";

const newInventoryData = [
  { id: "bucket-hat-mesh", inventory: 10 },
  { id: "bucket-hat-solid", inventory: 15 },
  { id: "crochet-beanie", inventory: 20 },
  { id: "knit-beanie", inventory: 25 },
  { id: "bandana", inventory: 30 },
  { id: "ear-warmer", inventory: 12 },
  { id: "fingerless-gloves", inventory: 18 },
];

async function updateInventory() {
  try {
    // Connect to MongoDB
    await connectDB();

    for (const item of newInventoryData) {
      const updated = await Product.findOneAndUpdate(
        { id: item.id },
        { inventory: item.inventory },
        { new: true, upsert: true } // upsert: create if it doesn't exist
      );
      console.log(`Updated ${updated.name} inventory to ${updated.inventory}`);
    }

    console.log("✅ Inventory update complete");
    process.exit(0); // exit after finishing
  } catch (err) {
    console.error("❌ Error updating inventory:", err);
    process.exit(1);
  }
}

updateInventory();
