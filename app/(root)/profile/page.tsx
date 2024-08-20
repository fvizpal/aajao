import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { currentUser } from '@/lib/data/auth'
import { IEvent } from '@/lib/database/models/event.model'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const user = await currentUser();
  const userId = user?.id as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data
    .map((order) => order.event)
    .filter((event): event is NonNullable<typeof event> => event !== null) as IEvent[];


  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
      {/* My Tickets */}
      <section>
        <div>
          <h3>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="Explore more events"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section>
        <div>
          <h3>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Hop on and create some events now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage