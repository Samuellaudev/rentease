'use server'

import connectDB from '@/config/db';
import Property from '@/models/Property';
import cloudinary from '@/config/cloudinary'
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface PropertyData {
  type: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  location: {
    street: FormDataEntryValue | null;
    city: FormDataEntryValue | null;
    state: FormDataEntryValue | null;
    zipcode: FormDataEntryValue | null;
  };
  beds: FormDataEntryValue | null;
  baths: FormDataEntryValue | null;
  square_feet: FormDataEntryValue | null;
  amenities: FormDataEntryValue[];
  rates: {
    weekly: FormDataEntryValue | null;
    monthly: FormDataEntryValue | null;
    nightly: FormDataEntryValue | null;
  };
  seller_info: {
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    phone: FormDataEntryValue | null;
  };
  owner: string;
  images?: string[]; // Add the images property here
}

async function addProperty(formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  // Access all values for amenities and images
  const amenities = formData.getAll('amenities');

  const images: FormDataEntryValue[] = formData.getAll('images');
  // Filter out any empty strings for Cloudinary
  const filteredImages: FormDataEntryValue[] = images.filter((image) => image && typeof image === 'object');

  // Create the propertyData object with embedded seller_info
  const propertyData: PropertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: userId
  };

  // Access the uploaded files from the form data
  const imageUrls = [];

  for (const imageFile of filteredImages) {
    // Assuming image is a File object, extract the file data
    let imageBuffer: ArrayBuffer;
    if (!(imageFile instanceof File)) return
    
    imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert the image data to base64
    const imageBase64 = imageData.toString('base64');

    // Upload the image data as a base64 string to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${ imageBase64 }`,
      {
        folder: 'RentEase',
      }
    );

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', 'layout');

  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;