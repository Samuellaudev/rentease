'use server';

import connectDB from '@/config/db';
import Message from '@/models/Message';
import { MessageType } from '@/types/message.type';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId) as MessageType

  if (!message) throw new Error('Message not found');

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // Update message to read/unread depending on the current status
  message.read = !message.read;

  await message.save();

  revalidatePath('/messages', 'page');

  return message.read;
}

export default markMessageAsRead;