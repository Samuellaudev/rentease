import connectDB from '@/config/db';
import Property from '@/models/Property';
import { PropertyType } from '@/types/property.type';

import PropertySearchForm from '@/components/Properties/PropertySearchForm'
import Properties from '@/components/Properties/Properties';

const PropertiesPage = async ({
  searchParams: { pageSize = 6, page = 1 }
}) => {
  await connectDB()

  const skip = (page - 1) * pageSize

  const totalProperties = await Property.countDocuments({})
  const properties: PropertyType[] = await Property
    .find({})
    .skip(skip)
    .limit(pageSize)

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearchForm />
        </div>
      </section>
      <Properties
        properties={ properties }
        page={ page }
        pageSize={ pageSize }
        totalProperties={ totalProperties }
      />
    </>
  );
};

export default PropertiesPage;