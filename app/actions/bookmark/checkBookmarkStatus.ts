'use server'

import connectDB from '@/config/db';
import User from '@/models/User';
import { User as UserType } from '@/types/user.type'
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId: string) { 
  await connectDB()

  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) { 
    throw new Error('User ID is required')
  }

  const { userId } = sessionUser

  // Find the user by their session ID
  const user = await User.findById(userId) as UserType

  // Check if the property is already bookmarked
  const isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked }
}

export default checkBookmarkStatus