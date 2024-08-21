import EventForm from '@/components/shared/EventForm';
import { currentUser } from '@/lib/data/auth';
import { Console } from 'console';
import React from 'react'

const Enventpage = async () => {

  const user = await currentUser();

  const userId = user?.id as string

  console.log("[userID in event>create>page]", userId);

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

export default Enventpage