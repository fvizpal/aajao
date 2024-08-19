'use server'

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import { ObjectId } from 'mongodb';
import User from '../database/models/user.model';
import { db } from '../database';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.fees) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            }
          },
          quantity: 1
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

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}


export const createOrder = async (order: CreateOrderParams) => {
  try {
    // Create a new order using Prisma
    const newOrder = await db.order.create({
      data: {
        stripeId: order.stripeId,
        totalAmount: order.totalAmount,
        event: {
          connect: { id: order.eventId },
        },
        buyer: {
          connect: { id: order.buyerId },
        },
        createdAt: order.createdAt || new Date(),
      },
    });

    return newOrder;
  } catch (error) {
    handleError(error);
    throw new Error('Failed to create order');
  }
};

export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    if (!eventId) throw new Error('Event ID is required');

    // Fetch orders by eventId with buyer and event information
    // @ts-ignore
    const orders = await db.order.findMany({
      where: {
        eventId: eventId,
        buyer: {
          OR: [
            {
              name: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
          ],
        },
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      select: {
        id: true,
        totalAmount: true,
        createdAt: true,
        buyer: true,
        event: true,
      },
    });

    return orders;
  } catch (error) {
    handleError(error);
    throw new Error('Failed to fetch orders by event');
  }
}

export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    // Fetch the orders with pagination, including related event and organizer details
    const orders = await db.order.findMany({
      where: {
        buyerId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: skipAmount,
      take: limit,
      include: {
        event: {
          include: {
            organiser: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // Count the total number of orders for pagination
    const ordersCount = await db.order.count({
      where: {
        buyerId: userId,
      },
    });

    return {
      data: orders,
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
    throw new Error('Failed to fetch orders by user');
  }
}