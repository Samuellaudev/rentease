'use server'

import connectDB from '@/config/db';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { MessageType } from '@/types/message.type';

async function addMessage(previousState: MessageType, formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: 'You must be logged in to send a message' };
  }

  const { userId } = sessionUser;

  const recipient = formData.get('recipient');

  if (userId === recipient) {
    return { error: 'You can not send a message to yourself' };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('message'),
  });

  await newMessage.save();

  revalidatePath('/messages', 'page');

  return { submitted: true };
}

export default addMessage;