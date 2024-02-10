'use client'

import { IEvent } from "@/lib/database/models/event.model"
import { SignedIn, SignedOut, auth, useUser } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser()
  const userId = user?.publicMetadata.userId as string;
  const hasFinished = new Date() > new Date(event.endDateTime);

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
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton