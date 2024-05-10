'use server'

import connectDB from '@/config/db';
import Property from '@/models/Property';
import cloudinary from '@/config/cloudinary'
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) throw new Error('Property Not Found');

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // extract public id's from image url in DB
  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split('/');
    return parts.at(-1)!.split('.').at(0);
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      const result = await cloudinary.uploader.destroy('RentEase/' + publicId);
    }
  }  

  await property.deleteOne();

  revalidatePath('/', 'layout');  
}

export default deleteProperty