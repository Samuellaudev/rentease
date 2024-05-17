import connectDB from '@/config/db';
import Property from '@/models/Property';
import { PropertyType } from '@/types/property.type';

import Link from 'next/link';
import PropertyCard from './Properties/PropertyCard';
import { Button } from './ui/button';

const HomeProperties = async () => {
  await connectDB()

  const recentProperties: PropertyType[] = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-primary mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            { recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={ property._id } property={ property } />
              ))
            ) }
          </div>
        </div>
      </section>
      <section className='m-auto max-w-lg px-6 mb-6'>
        <Button className='block bg-black text-white text-center mx-auto rounded-lg hover:bg-gray-700'>
          <Link href='/properties'>
            View All Properties
          </Link>
        </Button>
      </section>
    </>
  );
};


export default HomeProperties