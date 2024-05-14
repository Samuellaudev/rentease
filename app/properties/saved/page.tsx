import connectDB from '@/config/db';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { PropertyType } from '@/types/property.type';

import { redirect } from 'next/navigation'
import PropertyCard from '@/components/Properties/PropertyCard';

interface Bookmarks {
  bookmarks: PropertyType[]
}

export const dynamic = 'force-dynamic';

const SavedPropertiesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) { 
    throw new Error('User ID is required')
  }

  const { userId } = sessionUser;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    redirect('/')
  }

  const { bookmarks } = await User.findById(userId)
    .populate('bookmarks')
    .lean() as Bookmarks

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarks.map((property: PropertyType) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedPropertiesPage;