
import Collection from '@/components/shared/Collection';
import ProfileBody from '@/components/shared/ProfileBody';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useState } from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage })

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organisedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <ProfileBody orders={orders} ordersPage={ordersPage} eventsPage={eventsPage} orderedEvents={orderedEvents} organisedEvents={organisedEvents} />
  )
}

export default ProfilePage