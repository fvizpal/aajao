'use server'

import Stripe from 'stripe';
import { CheckoutOrderParamas, createOrderPramas } from "@/types";
import { redirect } from 'next/navigation';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';

export async function checkoutOrder(order: CheckoutOrderParamas) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const fees = order.isFree ? 0 : Number(order.fees);


  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: fees,
            product_data: {
              name: order.eventTitle,
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error
  }
}

export const createOrder = async (order: createOrderPramas) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}

