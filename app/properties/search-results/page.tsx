import connectDB from '@/config/db';
import Property from '@/models/Property';
import { PropertyType } from '@/types/property.type';

import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/components/Properties/PropertyCard';
import PropertySearchForm from '@/components/Properties/PropertySearchForm'

interface Query {
  $or: {
      name?: RegExp;
      description?: RegExp;
      'location.street'?: RegExp;
      'location.city'?: RegExp;
      'location.state'?: RegExp;
      'location.zipcode'?: RegExp;
  }[];
  type?: RegExp;
}

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}: {
  searchParams: { location: string, propertyType: string}
}) => {
  await connectDB();

  const locationPattern = new RegExp(location, 'i');

  let query: Query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  } 

  const properties = await Property.find(query).lean() as PropertyType[]

  return (
    <>
      <section className='bg-primary py-4'>
        <div className='max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link
            href='/properties'
            className='flex items-center text-primary hover:underline mb-3'
          >
            <FaArrowAltCircleLeft className='mr-2' /> Back to properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property, index) => (
                <PropertyCard property={property} key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};


export default SearchResultsPage;