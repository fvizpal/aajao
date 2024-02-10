import { IEvent } from "@/lib/database/models/event.model"
import Card from "./Card";
import PaginationEl from "./Pagination";

type CollectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyStateSubText: string,
  page: number | string,
  limit: number,
  totalPages?: number,
  collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events',
  urlParamName?: string,
}

const Collection = ({ data, emptyTitle, emptyStateSubText, page, totalPages = 0, collectionType, urlParamName }: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div>
          <ul>
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const hidePrice = collectionType === 'My_Tickets';

              return (
                <li key={event._id}>
                  <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <PaginationEl urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>
      ) : (
        <div>
          <h3>{emptyTitle}</h3>
          <p>{emptyStateSubText}</p>
        </div>
      )}
    </>
  )
}

export default Collection