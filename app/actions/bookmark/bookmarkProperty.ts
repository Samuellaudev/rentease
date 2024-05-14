'use server';

import connectDB from '@/config/db';
import User from '@/models/User';
import { Types } from 'mongoose';
import { UserTypeDocument } from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId) as UserTypeDocument

  // Cast user.bookmarks to Mongoose array type
  const bookmarks = user.bookmarks as Types.Array<string>;

  let isBookmarked = bookmarks.includes(propertyId)

  let message;

  if (isBookmarked) {
    bookmarks.pull(propertyId);
    message = 'Bookmark removed successfully';
    isBookmarked = false;
  } else {
    bookmarks.push(propertyId);
    message = 'Bookmark added successfully';
    isBookmarked = true;
  }

  await user.save();

  revalidatePath('/properties/saved', 'page');

  return { message, isBookmarked };
}

export default bookmarkProperty;