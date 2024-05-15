import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import profileDefault from '@/assets/images/profile.png';
import { LogOut, User, Heart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProfileDropdownProps {
  profileImage: string
  signOut: () => void
}

const ProfileDropdown = ({
  profileImage,
  signOut
}: ProfileDropdownProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type='button'
          className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
          id='user-menu-button'
          aria-expanded='false'
          aria-haspopup='true'
          onClick={ () => setIsProfileMenuOpen((prev) => !prev) }
        >
          <span className='absolute -inset-1.5'></span>
          <span className='sr-only'>Open user menu</span>
          <Image
            className='h-8 w-8 rounded-full'
            src={ profileImage || profileDefault }
            width={ 40 }
            height={ 40 }
            alt='Profile Image'
          />
        </button>
      </DropdownMenuTrigger>

      {/* <!-- Profile dropdown --> */ }
      { isProfileMenuOpen && (
        <DropdownMenuContent
          id='user-menu'
          className='absolute right-0 -mr-3 z-10 mt-5 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='user-menu-button'
          tabIndex={ -1 }
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link
                href='/profile'
                // className='block px-4 py-2 text-sm text-gray-700'
                role='menuitem'
                tabIndex={ -1 }
                id='user-menu-item-0'
                onClick={ () => setIsProfileMenuOpen(false) }
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              <Link
                href='/properties/saved'
                // className='block px-4 py-2 text-sm text-gray-700'
                role='menuitem'
                tabIndex={ -1 }
                id='user-menu-item-1'
                onClick={ () => setIsProfileMenuOpen(false) }
              >
                Saved Properties
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <Link
              href='#'
              // className='block px-4 py-2 text-sm text-gray-700'
              role='menuitem'
              tabIndex={ -1 }
              id='user-menu-item-2'
              onClick={ () => {
                setIsProfileMenuOpen(false);
                signOut();
              } }
            >
              Sign Out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) }
    </DropdownMenu>
    // <div className='relative ml-3'>
    //   <div>
    //     <button
    //       type='button'
    //       className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
    //       id='user-menu-button'
    //       aria-expanded='false'
    //       aria-haspopup='true'
    //       onClick={ () => setIsProfileMenuOpen((prev) => !prev) }
    //     >
    //       <span className='absolute -inset-1.5'></span>
    //       <span className='sr-only'>Open user menu</span>
    //       <Image
    //         className='h-8 w-8 rounded-full'
    //         src={ profileImage || profileDefault }
    //         width={ 40 }
    //         height={ 40 }
    //         alt='Profile Image'
    //       />
    //     </button>
    //   </div>

    //   {/* <!-- Profile dropdown --> */ }
    //   { isProfileMenuOpen && (
    //     <div
    //       id='user-menu'
    //       className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
    //       role='menu'
    //       aria-orientation='vertical'
    //       aria-labelledby='user-menu-button'
    //       tabIndex={ -1 }
    //     >
    //       <Link
    //         href='/profile'
    //         className='block px-4 py-2 text-sm text-gray-700'
    //         role='menuitem'
    //         tabIndex={ -1 }
    //         id='user-menu-item-0'
    //         onClick={ () => setIsProfileMenuOpen(false) }
    //       >
    //         Your Profile
    //       </Link>
    //       <Link
    //         href='/properties/saved'
    //         className='block px-4 py-2 text-sm text-gray-700'
    //         role='menuitem'
    //         tabIndex={ -1 }
    //         id='user-menu-item-1'
    //         onClick={ () => setIsProfileMenuOpen(false) }
    //       >
    //         Saved Properties
    //       </Link>
    //       <Link
    //         href='#'
    //         className='block px-4 py-2 text-sm text-gray-700'
    //         role='menuitem'
    //         tabIndex={ -1 }
    //         id='user-menu-item-2'
    //         onClick={ () => {
    //           setIsProfileMenuOpen(false);
    //           signOut();
    //         } }
    //       >
    //         Sign Out
    //       </Link>
    //     </div>
    //   ) }
    // </div>
  )
}

export default ProfileDropdown