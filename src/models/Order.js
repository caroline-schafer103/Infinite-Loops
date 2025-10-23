import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    email: String,
    amount_total: Number,
    items: Array,
    address: Object,
    stripeSessionId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
