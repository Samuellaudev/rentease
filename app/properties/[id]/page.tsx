import connectDB from '@/config/db';
import Property from '@/models/Property';
import { PropertyModel } from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import PropertyHeaderImage from '@/components/Properties/PropertyHeaderImage';
import PropertyDetails from '@/components/Properties/PropertyDetails';

const PropertyPage = async ({ params }: { params: { id: string } }) => {
  await connectDB();

  const propertyDoc: PropertyModel | null = await Property.findById(params.id).lean();

  if (!propertyDoc) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  const property = convertToSerializeableObject(propertyDoc) as PropertyModel;

  return (
    <>
      <PropertyHeaderImage image={ property.images[0] } />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' />Back to Properties
          </Link>
        </div>
      </section>
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails property={ property } />
            {/* <aside className='space-y-4'>
              <BookmarkButton property={property} />
              <ShareButtons property={ property } PUBLIC_DOMAIN={ PUBLIC_DOMAIN } />
              <PropertyContactForm property={property} />
            </aside> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default PropertyPage