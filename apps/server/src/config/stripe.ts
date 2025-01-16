import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY || "", {
  maxNetworkRetries: 2,
});

export default stripe;
