export type CreateEventParams = {
  userId: string
  event: {
    title: string
    description: string
    location: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    fees: string
    isFree: boolean
    url: string
  }
  path: string
}

export type UpdateEventParams = {
  userId: string
  event: {
    _id: string
    title: string
    imageUrl: string
    description: string
    location: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    fees: string
    isFree: boolean
    url: string
  }
  path: string
}

export type GetAllEventsParams = {
  query: string,
  category: string,
  page: number,
  limit: number
}

export type CreateCategoryParams = {
  categoryName: string
}

export type CreateUserParams = {
  clerkId: string,
  email: string,
  firstname: string,
  lastname: string,
  usename: string,
  photo: string,
}

export type UpdateUserParams = {
  firstname: string,
  lastname: string,
  usename: string,
  photo: string,
}


export type DeleteEventParams = {
  eventId: string
  path: string
}

export type UrlQueryParams = {
  params: string,
  key: string,
  value: string | null,
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string },
  searchParams: { [key: string]: string | string[] | undefined }
}