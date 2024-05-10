import connectDB from '@/config/db';
import Property from '@/models/Property';
import { PropertyType } from '@/types/property.type';

import PropertyCard from '@/components/Properties/PropertyCard';

const PropertiesPage = async () => {
  await connectDB()

  const properties: PropertyType[] = await Property.find({})

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        { properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            { properties.map((property) => (
              <PropertyCard key={ property._id } property={ property } />
            )) }
          </div>
        ) }
      </div>
    </section>
  );
};

export default PropertiesPage;