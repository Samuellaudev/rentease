import connectDB from '@/config/db';
import Property from '@/models/Property';
import { PropertyType } from '@/types/property.type';

import PropertySearchForm from '@/components/Properties/PropertySearchForm'
import Properties from '@/components/Properties/Properties';

const PropertiesPage = async () => {
  await connectDB()

  const properties: PropertyType[] = await Property.find({})

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearchForm />
        </div>
      </section>
      <Properties properties={ properties }/>
    </>
  );
};

export default PropertiesPage;