import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage })

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organisedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <>
      <section>
        <div>
          <h3>My Tickets</h3>
          <Button>
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <Collection
          data={orderedEvents}
          emptyTitle='No events booked yet'
          emptyStateSubText='Go on explore events'
          collectionType='My_Tickets'
          limit={3}
          page={ordersPage}
          urlParamName='ordersPage'
          totalPages={orders.totalPages}
        />
      </section>

      <section>
        <div>
          <h3>Events organised</h3>
          <Button asChild size="lg">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <Collection
          data={organisedEvents}
          emptyTitle='No events have been created yet'
          emptyStateSubText='Create some now :!'
          limit={3}
          page={eventsPage}
          urlParamName='eventsPage'
          totalPages={organisedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage