'use client';

import { useState } from 'react';
import { MessageType } from '@/types/message.type';
import { useGlobalContext } from '@/contexts/GlobalContext';
import markMessageAsRead from '@/app/actions/message/markMessageAsRead';
import deleteMessage from '@/app/actions/message/deleteMessage';
import { toast } from 'react-toastify';

import { AlertModal } from './AlertModal';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

interface MessageProp {
  message: MessageType
}

const MessageCard = ({ message }: MessageProp) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked as ${ read ? 'read' : 'new' }`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);

    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success('Message Deleted');
  };

  if (isDeleted) {
    return <p>Deleted message</p>;
  }

  return (
    <Card className='relative bg-white rounded-md shadow-md border border-gray-200'>
      { !isRead ? (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
          New
        </div>
      ) : null }

      <CardHeader className='text-xl mb-4'>
        <span className='font-medium'>Property Inquiry:</span>{ ' ' }
        <CardTitle>
          { typeof message.property === 'string' ? message.property : message.property.name }
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-gray-700'>{ message.body }</p>
        <ul className='mt-4'>
          <li>
            <strong>Name:</strong> { typeof message.sender === 'string' ? message.sender : message.sender.username }
          </li>
          <li>
            <strong>Reply Email:</strong>{ ' ' }
            <a href={ `mailto:${ message.email }` } className='text-primary'>
              { message.email }
            </a>
          </li>
          <li>
            <strong>Reply Phone:</strong>{ ' ' }
            <a href={ `tel:${ message.phone }` } className='text-primary'>
              { message.phone }
            </a>
          </li>
          <li>
            <strong>Received:</strong>{ ' ' }
            { new Date(message.createdAt).toLocaleString() }
          </li>
        </ul>
        <Button
          onClick={ handleReadClick }
          className={ `mt-4 mr-3 ${ isRead ? 'bg-gray-300 hover:bg-gray-400' : 'bg-cyan-600 text-white'
            } py-2 px-3 rounded-md cursor-pointer` }
        >
          { isRead ? 'Mark As New' : 'Mark As Read' }
        </Button>
        <AlertModal
          variantType='destructive'
          dialogContent={ {
            triggerWord: 'Delete',
            title: 'Are you sure you want to delete this message?',
            description: 'This action cannot be undone. This will permanently delete this message from our servers.'
          } }
          onClick={ handleDeleteClick }
        />
      </CardContent>
    </Card>
  );
};
export default MessageCard;