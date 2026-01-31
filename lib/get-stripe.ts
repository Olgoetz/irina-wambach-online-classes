import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2026-01-28.clover",
});

export default stripe;
