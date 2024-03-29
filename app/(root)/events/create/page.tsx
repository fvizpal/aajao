import EventForm from '@/components/forms/EventForm';
import { auth } from '@clerk/nextjs';
import React from 'react'

const Enveentpage = () => {

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section>
        <h3 className='p-6 text-2xl font-bold'>Create Event</h3>
      </section>
      <div>
        <EventForm userId={userId} type={"Create"} />
      </div>
    </>
  )
}

export default Enveentpage