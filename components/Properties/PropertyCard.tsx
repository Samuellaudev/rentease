import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';
import { PropertyType } from '@/types/property.type';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator';

interface PropertyProp {
  property: PropertyType
}

const PropertyCard = ({ property }: PropertyProp) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `$${ rates.monthly.toLocaleString() }/mo`;
    } else if (rates.weekly) {
      return `$${ rates.weekly.toLocaleString() }/wk`;
    } else if (rates.nightly) {
      return `$${ rates.nightly.toLocaleString() }/night`;
    }
  };

  return (
    <Card className='rounded-xl shadow-md relative'>
      <Image
        src={property.images[0]}
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='w-full h-auto rounded-t-xl'
      />
      <CardContent className='p-6'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <CardDescription className='text-gray-600'>{ property.type }</CardDescription>
          <CardTitle className='text-xl font-bold'>{ property.name }</CardTitle>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-primary font-bold text-right md:text-center lg:text-right'>
          { getRateDisplay() }
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline mr-2' /> { property.beds }{ ' ' }
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline mr-2' />
            { property.baths } <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline mr-2' />
            { property.square_feet }{ ' ' }
            <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          { property.rates.nightly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Nightly
            </p>
          ) }
          { property.rates.weekly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Weekly
            </p>
          ) }
          { property.rates.monthly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Monthly
            </p>
          ) }
        </div>

        <Separator className="my-4" />

        <CardFooter className='flex flex-row justify-between'>
          <div className='flex align-middle gap-2 lg:mb-0'>
            <FaMapMarker className='text-lg text-orange-700' />
            <span className='text-orange-700'>
              { property.location.city }, { property.location.state }
            </span>
          </div>
          <Link
            href={ `/properties/${ property._id }` }
            className='h-[36px] bg-primary hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;