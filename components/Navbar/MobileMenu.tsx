import Link from 'next/link'
import Image from 'next/image';
import { Session } from 'next-auth';
import clsx from 'clsx';

import Login from './Login';
import { navLinks, socialLinks } from '@/utils/constants';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { IoIosAddCircleOutline } from "react-icons/io";
import logo from '@/assets/images/logo.png';

interface MobileMenuProp {
  session: Session,
}

const MobileMenu = ({
  session
}: MobileMenuProp) => {
  const linkClasses = clsx(
    'group relative z-10 text-slate-700 flex items-center py-1 focus:outline-none hover:bg-primary group-hover:text-white rounded-md transition duration-300'
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          type='button'
          id='mobile-dropdown-button'
          className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white'
          aria-controls='mobile-menu'
          aria-expanded='false'
        >
          <span className='absolute -inset-0.5'></span>
          <span className='sr-only'>Open main menu</span>
          <svg
            className='block h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle className='mx-auto'>
            <Link className='flex flex-shrink-0 items-center' href='/'>
              <Image className='w-20 md:w-24' src={ logo } alt='RentEase' />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className='' id='mobile-menu'>
          <div className='space-y-2 px-2 pb-3 ml-2 mb-2'>
            { navLinks.map(item => (
              <div key={ item.title } className="group z-0" >
                <Link
                  href={ item.href }
                  className={ `${ linkClasses }` }
                >
                  { item.icon }
                  <SheetClose>{ item.title }</SheetClose>
                </Link>
              </div>
            )) }
            { session ? (
              <div className="group mt-2 z-0" >
                <Link
                  href='/properties/add'
                  className={ `${ linkClasses }` }
                >
                  <IoIosAddCircleOutline className='text-black text-xl mx-2 group-hover:text-white' />
                  <SheetClose>Add Property</SheetClose>
                </Link>
              </div>
            ) : null }
            <Separator className="my-4" />
            <div className="flex flex-row gap-2 space-x-8 mx-2 pt-2">
              { socialLinks.map((link, index) => (
                <a href={ link.href } key={ index } target="_blank">
                  <Image
                    src={ link.src }
                    alt={ link.alt }
                    width={ 20 }
                    height={ 20 }
                    className="duration-200 hover:invert-0 hover:sepia-0 hover:saturate-2 hover:hue-rotate-[184deg] hover:brightness-[110%] hover:contrast-[101%]"
                  />
                </a>
              )) }
            </div>

          </div>
            { !session ? <Login /> : null }
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu