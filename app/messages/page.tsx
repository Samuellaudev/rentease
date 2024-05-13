import connectDB from '@/config/db';
import Message from '@/models/Message';
// NOTE: Import the Property model so it is instantiated in our serverless
// environment to be able to call Message.populate
import '@/models/Property';
import { MessageType } from '@/types/message.type';

import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import MessageCard from '@/components/Message';

const MessagesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false
  }).sort({ createdAt: -1 }) // Sort read messages in asc order
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  // const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
  const messages = [...unreadMessages].map((messageDoc) => {
    const message = convertToSerializeableObject(messageDoc) as MessageType
    message.sender = convertToSerializeableObject(message.sender) as MessageType['sender']
    message.property = convertToSerializeableObject(message.property) as MessageType['property']
    return message
  })

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            ) : (
              <p>You have no messages.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MessagesPage;

