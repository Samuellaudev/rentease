'use client';

import { useEffect } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';
import addMessage from '@/app/actions/message/addMessage';

import { PropertyType } from '@/types/property.type';
import { MessageType } from '@/types/message.type';

import { toast } from 'react-toastify';
import { FaPaperPlane } from 'react-icons/fa';

interface PropertyProps {
  property: PropertyType
}

const SubmitMessageButton = () => {
  const status = useFormStatus();
  return (
    <button
      className='bg-primary hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
      type='submit'
    >
      <FaPaperPlane className='mr-2' />{ ' ' }
      { status.pending ? 'Sending...' : 'Send Message' }
    </button>
  );
}

const PropertyContactForm = ({ property }: PropertyProps) => {
  const { data: session } = useSession();

  const initialState: MessageType = {
    _id: '',
    sender: "",
    recipient: "",
    property: "",
    name: "",
    email: "",
    phone: "",
    body: "",
    read: false,
    createdAt: "",
    updatedAt: "",
    error: "",
    submitted: false,
  };

  async function submitHandler(state: MessageType, formData: FormData): Promise<MessageType> {
    try {

      const result = await addMessage(state, formData);

      if (result.error) {
        return { ...state, error: result.error };
      } else {
        return { ...state, submitted: true };
      }
    } catch (error) {

      console.error('Error:', error);
      return state;
    }
  }

  const [submitState, formAction] = useFormState<MessageType, FormData>(submitHandler, initialState);

  useEffect(() => {
    if (submitState.error) toast.error(submitState.error);
    if (submitState.submitted) toast.success('Message sent successfully');
  }, [submitState]);

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      { !session ? (
        <p>You must be logged in to send a message</p>
      ) : submitState.submitted ? (
        <p className='text-green-500 mb-4'>
          Your message has been sent successfully
        </p>
      ) : (
        <form action={ formAction }>
          {/* NOTE: Here we have two hidden inputs to add the property id and the owner to our FormData submission */ }
          <input
            type='hidden'
            id='property'
            name='property'
            defaultValue={ property._id }
          />
          <input
            type='hidden'
            id='recipient'
            name='recipient'
            defaultValue={ property.owner }
          />
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'
            >
              Name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              name='name'
              type='text'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone'
            >
              Phone:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              name='phone'
              type='text'
              placeholder='Enter your phone number'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='message'
            >
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='message'
              name='message'
              placeholder='Enter your message'
            ></textarea>
          </div>
          <div>
            <SubmitMessageButton />
          </div>
        </form>
      ) }
    </div>
  );
};
export default PropertyContactForm;
