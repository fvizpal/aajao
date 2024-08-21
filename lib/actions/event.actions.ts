'use server'

import { revalidatePath } from "next/cache"
import { db } from "../database"
import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types"
import { handleError } from "../utils";


// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    // Ensure the organizer exists
    const organizer = await db.user.findUnique({
      where: { id: userId },
    });
    if (!organizer) throw new Error('Organizer not found');

    // Create the event
    const newEvent = await db.event.create({
      data: {
        title: event.title,
        description: event.description,
        location: event.location,
        imageUrl: event.imageUrl,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        fees: event.fees,
        isFree: event.isFree ?? true,
        url: event.url,
        category: {
          connect: { id: event.categoryId },
        },
        organiser: {
          connect: { id: userId },
        },
      },
    });

    revalidatePath(path);

    // Return the newly created event
    return newEvent;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create event');
  }
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    // Check if the event exists and belongs to the user
    const eventToUpdate = await db.event.findUnique({
      where: { id: event.id },
      include: { organiser: true },
    });

    if (!eventToUpdate || eventToUpdate.organiserId !== userId) {
      throw new Error('Unauthorized or event not found');
    }

    // Update the event
    const updatedEvent = await db.event.update({
      where: { id: event.id },
      data: {
        title: event.title,
        description: event.description,
        location: event.location,
        imageUrl: event.imageUrl,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        fees: event.fees,
        isFree: event.isFree,
        url: event.url,
        category: event.categoryId ? { connect: { id: event.categoryId } } : undefined,
      },
    });

    // Revalidate the path
    revalidatePath(path);

    // Return the updated event
    return updatedEvent;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update event');
  }
}

// GET EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    // Fetch the event along with its organizer and category
    const event = await db.event.findUnique({
      where: { id: eventId },
      include: {
        organiser: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!event) throw new Error('Event not found');

    // Return the event data
    return event;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to retrieve event');
  }
}

// delete event
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    // Delete the event by its ID
    const deletedEvent = await db.event.delete({
      where: { id: eventId },
    });

    // Revalidate the path if the event was successfully deleted
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete event');
  }
}

const getCategoryByName = async (name: string) => {
  return db.category.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive', // Case-insensitive search
      },
    },
  });
};

export async function getAllEvents({ query, limit = 6, page = 1, category }: GetAllEventsParams) {
  try {
    // Get category condition
    let categoryCondition = {};

    if (category) {
      const categoryData = await getCategoryByName(category);
      if (categoryData) {
        categoryCondition = { categoryId: categoryData.id };
      }
    }

    // Create title condition
    const titleCondition = query ? { title: { contains: query, mode: 'insensitive' } } : {};

    // Calculate pagination
    const skipAmount = (Number(page) - 1) * limit;

    // Query events with filters, pagination, and sorting
    const events = await db.event.findMany({
      where: {
        AND: [
          titleCondition,
          categoryCondition,
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: skipAmount,
      take: limit,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        organiser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Count total number of events for pagination
    const eventsCount = await db.event.count({
      where: {
        AND: [
          titleCondition,
          categoryCondition,
        ],
      },
    });

    return {
      data: events,
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch events');
  }
}

export async function getEventsByUser({ userId, limit = 6, page = 1 }: GetEventsByUserParams) {
  try {
    // Calculate the amount to skip for pagination
    const skipAmount = (Number(page) - 1) * limit;

    // Fetch events created by the user, including the related category and organiser
    const events = await db.event.findMany({
      where: {
        organiserId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: skipAmount,
      take: limit,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        organiser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Count the total number of events for the user
    const eventsCount = await db.event.count({
      where: {
        organiserId: userId,
      },
    });

    // Return the paginated data and total pages
    return {
      data: events,
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to retrieve events');
  }
}

export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    // Fetch related events with pagination
    const events = await db.event.findMany({
      where: {
        categoryId: categoryId,
        id: {
          not: eventId, // Exclude the current event
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: skipAmount,
      take: limit,
      include: {
        category: true, // Include category details
        organiser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Count the total number of related events
    const eventsCount = await db.event.count({
      where: {
        categoryId: categoryId,
        id: {
          not: eventId,
        },
      },
    });

    return {
      data: events,
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
    throw new Error('Failed to fetch related events');
  }
}