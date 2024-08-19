import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { currentUser } from "@/lib/data/auth"

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const user = await currentUser();

  const userId = user?.id as string;
  const event = await getEventById(id)

  return (
    <>
      <section>
        <h3 className='p-6 text-2xl font-bold'>Update Event</h3>
      </section>

      <div>
        <EventForm
          type="Update"
          // @ts-ignore
          event={event}
          eventId={event.id}
          userId={userId}
        />
      </div>
    </>
  )
}

export default UpdateEvent