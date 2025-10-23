import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  color: {
    type: [String],
    validate: {
      validator: (arr) => arr.length >= 1 && arr.length <= 2,
      message: "Each variant must have 1 or 2 colors only.",
    },
    required: true,
  },
  inventory: { type: Number, required: true, default: 0 },
  images: [String], // URLs for this variant
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [String], // general product images
  variants: [variantSchema],
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
