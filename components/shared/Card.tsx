import { IEvent } from '@/lib/database/models/event.model'
import { auth } from '@clerk/nextjs'
import { Delete } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import DeleteConfirm from './DeleteConfirm'
import { formatDateTime } from '@/lib/utils'

type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div>
      <Link
        href={`/events/${event._id}`}
      >
        {isEventCreator && (
          <div>
            <Link href={`/events/${event._id}/update`}>
              <Image src={'/assets/icons/edit.svg'} alt='edit' width={20} height={20} />
            </Link>

            <DeleteConfirm eventId={event._id} />
          </div>
        )}

        <div>
          {!hidePrice && <div className="flex gap-2">
            <span>
              {event.isFree ? 'FREE' : `$${event.fees}`}
            </span>
            <p>
              {event.category.name}
            </p>
          </div>}

          <p>{formatDateTime(event.startDateTime)}</p>

          <Link href={`/events/${event._id}`}>
            <p>{event.title}</p>
          </Link>

          <div className="flex-between w-full">
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>

            {hasOrderLink && (
              <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
                <p>Order Details</p>
                <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
              </Link>
            )}
          </div>

        </div>
      </Link>
    </div>
  )
}

export default Card