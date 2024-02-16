'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex md:justify-center md:items-center flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${isActive && 'text-emerald-600'
              } flex justify-center items-center whitespace-nowrap font-semibold`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems