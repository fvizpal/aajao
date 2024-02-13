'use client'

import { IEvent } from "@/lib/database/models/event.model"
import { SignedIn, SignedOut, auth, useUser } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"
import { checkoutOrder } from "@/lib/actions/order.actions"
import { useEffect, useState } from "react"

const CheckoutButton = ({ event }: { event: IEvent }) => {

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const { user } = useUser()
  const userId = user?.publicMetadata.userId as string;
  const hasFinished = new Date() > new Date(event.endDateTime);


  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      fees: event.fees,
      isFree: event.isFree,
      buyerId: userId,
    }

    await checkoutOrder(order);
  }

  return (
    <div>
      {hasFinished ? (
        <p>Sorry, the event has finished; tickets are no longer available</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild size={'lg'}>
              <Link href="/sign-in">
                Get Tickets
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button onClick={onCheckout}>
              {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
            </Button>
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton