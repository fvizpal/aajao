'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Collection from './Collection';

type ProfileBodyProps = {
  ordersPage: number
  eventsPage: number
  orders: {} | undefined
  orderedEvents: any
  organisedEvents: {} | undefined
}

const ProfileBody = ({ orders, ordersPage, eventsPage, orderedEvents, organisedEvents }: ProfileBodyProps) => {
  const [isBookingsTab, setIsBookingsTab] = useState<boolean>(true);

  return (
    <>
      <section>
        <Button
          className=' bg-emerald-500 rounded-2xl'
          onClick={() => setIsBookingsTab(true)}
        >
          My Bookings
        </Button>
        <Button
          className=' bg-emerald-500 rounded-2xl'
          onClick={() => setIsBookingsTab(false)}
        >
          My Events
        </Button>
      </section>
      <section>
        {isBookingsTab ? (
          <>
            <div>
              <h3>My Bookings</h3>
              <Button>
                <Link href="/#events">
                  Explore More Events
                </Link>
              </Button>
            </div>


            <div>
              <Collection
                data={orderedEvents}
                emptyTitle='No events booked yet'
                emptyStateSubText='Go on explore events'
                collectionType='My_Tickets'
                limit={3}
                page={ordersPage}
                urlParamName='ordersPage'
                totalPages={orders?.totalPages}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <h3>Events organised</h3>
              <Button asChild size="lg">
                <Link href="/events/create">
                  Create New Event
                </Link>
              </Button>
            </div>

            <div>
              <Collection
                data={organisedEvents?.data}
                emptyTitle='No events have been created yet'
                emptyStateSubText='Create some now :!'
                limit={3}
                page={eventsPage}
                urlParamName='eventsPage'
                totalPages={organisedEvents?.totalPages}
              />
            </div>
          </>
        )}

      </section>
    </>
  )
}

export default ProfileBody