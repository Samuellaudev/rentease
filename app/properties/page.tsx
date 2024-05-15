import connectDB from '@/config/db';
import Property from '@/models/Property';
import { PropertyType } from '@/types/property.type';

import PropertySearchForm from '@/components/Properties/PropertySearchForm'
import Properties from '@/components/Properties/Properties';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const PropertiesPage = async ({
  searchParams: { pageSize = 6, page = 1 }
}) => {
  await connectDB()

  const skip = (page - 1) * pageSize

  const totalProperties = await Property.countDocuments({})
  const properties = await Property
    .find({})
    .skip(skip)
    .limit(pageSize) as PropertyType[]

  const breadcrumbArea = (
    <Breadcrumb className='container mt-4'>
      <BreadcrumbList>
        <BreadcrumbItem className='text-base'>
          <BreadcrumbLink
            href="/">Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='text-base' />
        <BreadcrumbItem className='text-base'>
          <BreadcrumbPage>Properties</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  return (
    <>
      <section className='bg-primary py-4'>
        <div className='max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearchForm />
        </div>
      </section>
      { breadcrumbArea }
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