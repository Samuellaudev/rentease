'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
// import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import { PropertyType } from '@/types/property.type';

interface PropertyProps {
  property: PropertyType
}

const BookmarkButton = ({ property }: PropertyProps) => {
  const { data: session } = useSession()
  const userId: string | undefined = session?.user?.id

  const [isBookmarked, setIsBookmarked] = useState(false);
  // const [loading, setLoading] = useState(true);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
      return;
    }

    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  // if (loading) return <p className='text-center'>Loading...</p>;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
