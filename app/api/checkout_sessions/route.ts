const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { boughtQuestion, getCart } from "@/app/myquestion/[career]/action";
import { cartType } from "@/components/types/careerTypes";

export async function POST(req: NextRequest) {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser()
        const cartList:cartType[]|null = await getCart(user!.id)
        let priceList = cartList?.map((item)=>({
          price: item.occupation.price_id,
          quantity: 1
        }))
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: priceList,
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
    const sessionId = req.nextUrl.searchParams.get('session_id');
    const session =
      await stripe.checkout.sessions.retrieve(sessionId);
      if(session.status === 'complete'){
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
        await boughtQuestion(lineItems);
      }
      return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details.email
    });
  } catch (err) {
    return NextResponse.json({error: err}, {status: 500});
  }
}