import { PropertyType } from '@/types/property.type';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker
} from 'react-icons/fa';
// import PropertyMap from './PropertyMap';
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card"

interface PropertyProps {
  property: PropertyType
}

const PropertyDetails = ({ property }: PropertyProps) => {
  return (
    <main>
      <Card className='bg-white rounded-lg shadow-md text-center md:text-left'>
        <CardHeader>
          <CardDescription className='text-gray-500 mb-4'>{ property.type }</CardDescription>
          <CardTitle className='text-3xl font-bold mb-4'>{ property.name }</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
            <FaMapMarker className='text-orange-700 mr-2 text-lg' />
            <p className='text-orange-700'>
              { property.location.street }, { property.location.city }{ ' ' }
              { property.location.state }
            </p>
          </div>

          <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>
            Rates & Options
          </h3>
          <div className='flex flex-col md:flex-row justify-around'>
            <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
              <div className='text-gray-500 mr-2 font-bold'>
                Nightly
              </div>
              <div className='text-2xl font-bold'>
                { property.rates.nightly ? (
                  `$${ property.rates.nightly.toLocaleString() }`
                ) : (
                  <FaTimes className='text-red-700' />
                ) }
              </div>
            </div>
            <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
              <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
              <div className='text-2xl font-bold text-primary'>
                { property.rates.weekly ? (
                  `$${ property.rates.weekly.toLocaleString() }`
                ) : (
                  <FaTimes className='text-red-700' />
                ) }
              </div>
            </div>
            <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
              <div className='text-gray-500 mr-2 font-bold'>
                Monthly
              </div>
              <div className='text-2xl font-bold text-primary'>
                { property.rates.monthly ? (
                  `$${ property.rates.monthly.toLocaleString() }`
                ) : (
                  <FaTimes className='text-red-700' />
                ) }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-white rounded-lg shadow-md mt-6'>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>
            Description & Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center gap-4 text-primary mb-6 text-xl space-x-9'>
            <p>
              <FaBed className='inline-block mr-2' /> { property.beds }{ ' ' }
              <span className='hidden sm:inline'>Beds</span>
            </p>
            <p>
              <FaBath className='inline-block mr-2' /> { property.baths }{ ' ' }
              <span className='hidden sm:inline'>Baths</span>
            </p>
            <p>
              <FaRulerCombined className='inline-block mr-2' />
              { property.square_feet } <span className='hidden sm:inline'>sqft</span>
            </p>
          </div>
          <CardDescription className='text-gray-500 text-md mb-2'>
            { property.description }
          </CardDescription>
        </CardContent>
      </Card>

      <Card className='bg-white rounded-lg shadow-md mt-6'>
        <CardHeader>
          <CardTitle className='text-lg font-bold'>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2'>
            { property.amenities?.map((amenity, index) => (
              <li key={ index }>
                <FaCheck className='inline-block mr-2 text-green-600' />
                { amenity }
              </li>
            )) }
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}

export default PropertyDetails