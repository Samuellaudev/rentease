import { PropertyType } from '@/types/property.type';
import PropertyCard from '@/components/Properties/PropertyCard';
import Pagination from '../Pagination';

interface PropertiesProps {
  properties: PropertyType[]
  page: number;
  pageSize: number;
  totalProperties: number;
}

const Properties = ({
  properties,
  page,
  pageSize,
  totalProperties
}: PropertiesProps) => {
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
      <Pagination
        page={ page }
        pageSize={ pageSize }
        totalItems={ totalProperties }
      />
    </section>
  )
}

export default Properties