import CheckoutButton from '@/components/shared/CheckoutButton';
import { getEventById } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'

const EventsDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);


  return (
    <>
      <section>
        <div>
          {/* image */}
          <div>
            <div>
              <h2>{event.title}</h2>
              <div>
                <div>
                  <p>{event.isFree ? 'FREE' : `$${event.price}`}</p>
                  <p>
                    {event.category.name}
                  </p>
                </div>
                <p>by{' '}
                  <span>{event.organiser.firstName} {event.organiser.lastName}</span>
                </p>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div>
              <div>
                {/* image */}
                <p>{formatDateTime(event.startDateTime)}</p>
                <p>{formatDateTime(event.endDateTime)}</p>
              </div>
            </div>

            <div>
              {/* image */}
              <p>{event.location}</p>
            </div>
            <div>
              <p>{event.description}</p>
              <p>{event.url}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EventsDetails