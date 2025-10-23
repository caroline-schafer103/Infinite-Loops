import Stripe from "stripe";
import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

// ✅ Use environment variable instead of hardcoding your Stripe key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Also move your webhook secret to the environment file
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      await connectToDB();

      // Parse the metadata sent from checkout
      const items = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : [];

      // Save the order
      await Order.create({
        email: session.customer_details.email,
        amount_total: session.amount_total / 100,
        items,
        address: session.customer_details.address,
        stripeSessionId: session.id,
      });

      console.log("✅ Order saved:", session.id);

      // Update product inventory
      for (const item of items) {
        const product = await Product.findOne({ id: item.id });

        if (!product) {
          console.warn(`⚠️ Product not found for id: ${item.id}`);
          continue;
        }

        const variant = product.variants.find(
          (v) =>
            v.color.length === item.color.length &&
            v.color.every((c) => item.color.includes(c))
        );

        if (variant) {
          variant.inventory = Math.max(0, variant.inventory - item.quantity);
          await product.save();
          console.log(
            `✅ Inventory updated for ${product.name} (${variant.color.join(
              " & "
            )}): now ${variant.inventory}`
          );
        } else {
          console.warn(`⚠️ Variant not found for product ${item.id}`);
        }
      }

      console.log("✅ All inventory updates complete");
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
