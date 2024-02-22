import { createOrder } from "@/lib/actions/order.actions";
import { NextResponse } from "next/server";
import stripe from "stripe";


export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  const eventType = event.type

  switch (eventType) {
    case 'checkout.session.completed':
      const { id, amount_total, metadata } = event.data.object;
      const order = {
        stripeId: id,
        eventId: metadata?.eventId || '',
        buyerId: metadata?.buyerId || '',
        totalAmount: amount_total ? (amount_total).toString() : '0',
        createdAt: new Date(),
      }
      const newOrder = await createOrder(order)
      return NextResponse.json({ message: 'OK', order: newOrder })
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('', { status: 200 })
}