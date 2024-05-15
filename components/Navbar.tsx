'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import UnreadMessageCount from './UnreadMessageCount';
import ProfileDropdown from './Navbar/ProfileDropdown';
import DesktopMenu from './Navbar/DesktopMenu';
import MobileMenu from './Navbar/MobileMenu';
import Login from './Navbar/Login';

const Navbar = () => {
  const { data: session } = useSession()
  const profileImage = session?.user?.image!;

  const pathname = usePathname()
  return (
    <nav className="fixed mx-auto text-slate-600 top-0 left-0 right-0 z-[20] bg-white bg-opacity-80 backdrop-blur-md backdrop-opacity-80">
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            <MobileMenu session={ session! } />
          </div>

          <DesktopMenu session={ session! } />

          {/* <!-- Right Side Menu (Logged Out) --> */ }
          { !session && pathname !== '/signIn' ?
            <div className='hidden md:block text-primary mr-2' >
              <Login />
            </div>
            : null }

          {/* <!-- Right Side Menu (Logged In) --> */ }
          { session ? (
            <div className='absolute inset-y-0 right-0 flex items-center space-x-1 md:static md:inset-auto md:ml-6 md:pr-0'>
              <Link href='/messages' className='relative group'>
                <button
                  type='button'
                  className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='absolute -inset-1.5'></span>
                  <span className='sr-only'>View notifications</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </button>
                <UnreadMessageCount />
              </Link>
              <ProfileDropdown
                profileImage={ profileImage }
                signOut={ signOut }
              />
            </div>
          ) : null }
        </div>
      </div>
    </nav>
  );
};
export default Navbar;