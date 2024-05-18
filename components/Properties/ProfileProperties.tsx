'use client'

import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { toast } from 'react-toastify';
import { PropertyType } from '@/types/property.type';
import deleteProperty from '@/app/actions/deleteProperty';

import { AlertModal } from '../AlertModal';

interface PropertyProp {
  properties: PropertyType[]
}

const ProfileProperties = ({ properties: initialProperties }: PropertyProp) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    await deleteProperty(propertyId);

    toast.success('Property Deleted');

    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );

    setProperties(updatedProperties);
  };

  return (
    properties.map((property) => (
      <div key={ property._id } className='mb-10'>
        <Link href={ `/properties/${ property._id }` }>
          <Image
            className='h-32 w-full rounded-md object-cover'
            src={ property.images[0] }
            alt=''
            width={ 500 }
            height={ 100 }
            priority={ true }
          />
        </Link>
        <div className='mt-2'>
          <p className='text-lg font-semibold'>{ property.name }</p>
          <p className='text-gray-600'>
            Address: { property.location.street }{ ' ' }
            { property.location.city } { property.location.state }
          </p>
        </div>
        <div className='mt-2'>
          <Link
            href={ `/properties/${ property._id }/edit` }
            className='bg-primary text-white px-5 py-2 rounded-md mr-2 hover:bg-cyan-600'
          >
            Edit
          </Link>
          <AlertModal
            variantType='destructive'
            dialogContent={ {
              triggerWord: 'Delete',
              title: 'Are you sure you want to delete this property?',
              description: 'This action cannot be undone. This will permanently delete your property from our servers.'
            } }
            onClick={ () => handleDeleteProperty(property._id) }
          />
        </div>
      </div>
    ))
  )
}

export default ProfileProperties