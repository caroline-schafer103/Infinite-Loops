import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Create Stripe line items
    // const lineItems = body.items.map((item) => ({
    //   price_data: {
    //     currency: "usd",
    //     product_data: {
    //       name: item.name,
    //     },
    //     unit_amount: Math.round(item.price * 100),
    //   },
    //   quantity: item.quantity,
    // }));

    // Create Stripe line items (for testing, charge only $0.50 total)
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Test Item",
          },
          unit_amount: 50, // 50¢ — Stripe requires minimum 50 cents
        },
        quantity: 1,
      },
    ];

    // Compact metadata (for webhook inventory tracking)
    const metadata = {
      cart: JSON.stringify(
        body.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
        }))
      ),
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1, currency: "usd" },
            display_name: "Standard shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      metadata,
      success_url: `${request.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
