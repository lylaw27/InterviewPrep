const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req.headers.get('origin'))
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of
              // the product you want to sell
              price: 'price_1PptmvIIK3z82Fe4AuJ2qXS2',
              quantity: 1,
            },
          ],
          mode: 'payment',
          return_url:
            `${req.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.json({clientSecret: session.client_secret});
      } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
      } 
  }

export async function GET(req: NextRequest) {
  try {
    const session =
      await stripe.checkout.sessions.retrieve(req.nextUrl.searchParams);
      NextResponse.json({
      status: session.status,
      customer_email: session.customer_details.email
    });
  } catch (err) {
    return NextResponse.json({error: err}, {status: 500});
  }
}