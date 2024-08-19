export type CreateEventParams = {
  userId: string; // The ID of the user creating the event
  event: {
    title: string;                  // Event title
    description?: string;           // Optional event description
    location?: string;              // Optional event location
    imageUrl: string;               // URL of the event image
    startDateTime: Date;            // Start date and time of the event
    endDateTime: Date;              // End date and time of the event
    categoryId: string;            // ID of the category
    fees?: string;                  // Optional event fees
    isFree?: boolean;               // Whether the event is free or not
    url?: string;                   // Optional URL related to the event
  };
  path: string;                     // Path to revalidate after creating the event
};

export type UpdateEventParams = {
  userId: string
  event: {
    id: string
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
  firstName: string,
  lastName: string,
  username: string,
  photo: string,
}

export type UpdateUserParams = {
  firstName: string,
  lastName: string,
  username: string,
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

export type CheckoutOrderParamas = {
  eventTitle: string,
  eventId: string,
  fees: string,
  isFree: boolean,
  buyerId: string,
}

export type createOrderPramas = {
  stripeId: string
  eventId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

export type GetEventsByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

export type GetOrdersByEventParams = {
  eventId: string
  searchText: string
}


// types.ts

import { User, Category } from "@prisma/client"
// Define the User type
// export interface User {
//   id: string;
//   name?: string;
//   email?: string;
//   emailVerified?: Date;
//   image?: string;
//   password?: string;
//   accounts?: Account[]; // Adjust if you have a more specific type
//   createdAt: Date;
//   updatedAt: Date;
// }

// Define the Category type
// export interface Category {
//   id: string;
//   name: string;
// }

// Define the Event type with nested User and Category types
export type Event = {
  id: string;
  title: string;
  description: string | null;  // Updated to accept null
  location: string | null;     // Updated to accept null
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  fees: string | null;         // Updated to accept null
  isFree: boolean;
  url: string | null;          // Updated to accept null
  category: {
    id: string;
    name: string;
  } | null;
  organiser: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};