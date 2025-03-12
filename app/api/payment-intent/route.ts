import { NextRequest, NextResponse } from "next/server";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount, customerEmail } = await request.json();

    const customer = await stripe.customers.create({
      email: customerEmail,
    });

    const price = await stripe.prices.create({
      unit_amount: amount,
      currency: "usd",
      recurring: { interval: "month" },
      product_data: {
        name: "Monthly Subscription",
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    const clientSecret =
      subscription.latest_invoice.payment_intent.client_secret;

    return NextResponse.json({ clientSecret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
