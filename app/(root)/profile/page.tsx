import { auth } from '@clerk/nextjs'
import React from 'react'

const ProfilePage = () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;


  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage