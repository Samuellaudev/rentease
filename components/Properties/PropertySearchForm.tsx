'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const PropertySearchForm = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location === '' && propertyType === 'All') {
      router.push('/properties');
    } else {
      const query = `?location=${ location }&propertyType=${ propertyType }`;

      router.push(`/properties/search-results${ query }`);
    }
  };

  return (
    <form
      onSubmit={ handleSubmit }
      className=' mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
        <label htmlFor='location' className='sr-only'>
          Location
        </label>
        <input
          type='text'
          id='location'
          placeholder='Enter Location or Keyword'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-gray-500'
          value={ location }
          onChange={ (e) => setLocation(e.target.value) }
        />
      </div>
      <div className='w-full md:w-2/5 md:pl-2'>
        <Label htmlFor="property-type" className='sr-only'>Property Type</Label>
        <Select
          value={ propertyType }
          onValueChange={ setPropertyType }
        >
          <SelectTrigger className='w-full px-4 py-[23px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-gray-500'>
            <SelectValue className='text-gray-300' placeholder="Select Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Property Type</SelectLabel>
              <SelectItem value='All'>All</SelectItem>
              <SelectItem value='Apartment'>Apartment</SelectItem>
              <SelectItem value='Studio'>Studio</SelectItem>
              <SelectItem value='Condo'>Condo</SelectItem>
              <SelectItem value='House'>House</SelectItem>
              <SelectItem value='Cabin Or Cottage'>Cabin or Cottage</SelectItem>
              <SelectItem value='Loft'>Loft</SelectItem>
              <SelectItem value='Room'>Room</SelectItem>
              <SelectItem value='Other'>Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <button
        type='submit'
        className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-cyan-400 text-white hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-gray-600 transition duration-300'
      >
        Search
      </button>
    </form>
  )
}

export default PropertySearchForm