import Link from 'next/link'
import Image from 'next/image'
import { Session } from 'next-auth';
import logo from '@/assets/images/logo.png';
import clsx from 'clsx';
import { navLinks } from '@/utils/constants';

interface DesktopMenuProp {
  session: Session
}

const DesktopMenu = ({
  session
}: DesktopMenuProp) => {
  const linkClasses = clsx(
    'relative z-10 text-slate-700 py-2'
  );

  const underlineClasses = clsx(
    'absolute w-full z-20 mt-0.5 duration-500 border-b-2 opacity-0 border-slate-700 group-hover:opacity-100',
  );

  return (
    <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
      {/* <!-- Logo --> */ }
      <Link className='flex flex-shrink-0 items-center' href='/'>
        <Image className='w-20 md:w-24' src={ logo } alt='RentEase' />
      </Link>
      {/* <!-- Desktop Menu Hidden below md screens --> */ }
      <div className='hidden md:ml-6 md:block my-auto'>
        <div className='flex space-x-6'>
          { navLinks.map(item => (
            <div key={ item.title } className="group mt-2 z-0 flex items-center" >
              <Link
                href={ item.href }
                className={ `${ linkClasses }` }
              >
                { item.title }
                <div className={ underlineClasses }></div>
              </Link>
            </div>
          )) }
          { session ? (
            <div className="group mt-2 z-0 flex items-center" >
              <Link
                href='/properties/add'
                className={ `${ linkClasses }` }
              >
                Add Property
                <div className={ underlineClasses }></div>
              </Link>
            </div>
          ) : null }
        </div>
      </div>
    </div>
  )
}

export default DesktopMenu