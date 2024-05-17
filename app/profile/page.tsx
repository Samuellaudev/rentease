import connectDB from '@/config/db';
import Property from '@/models/Property';
import { PropertyType } from '@/types/property.type';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializeableObject } from '@/utils/convertToObject';

import ProfileProperties from '@/components/Properties/ProfileProperties';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const propertiesDocs: PropertyType[] = await Property.find({ owner: userId }).lean();
  const properties = propertiesDocs.map(convertToSerializeableObject) as PropertyType[]

  const profileName = sessionUser?.user?.name;
  const profileEmail = sessionUser?.user?.email;

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-6 md:py-12'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border'>
          <h1 className='text-2xl md:text-3xl font-bold'>Your Profile</h1>

          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 my-6'>
              <h2 className='text-lg mb-4'>
                <span className='font-bold block'>Name: </span> { profileName }
              </h2>
              <h2 className='text-lg'>
                <span className='font-bold block'>Email: </span> { profileEmail }
              </h2>
            </div>
            <Separator className='mb-4 md:hidden'/>
            <div className='md:w-3/4 md:pl-4 md:mt-6'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              { properties.length === 0 ? (
                <p>You have no property listings.</p>
              ) : (
                <ProfileProperties properties={properties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
