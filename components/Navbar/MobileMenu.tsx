import Link from 'next/link'
import { Session } from 'next-auth';
import clsx from 'clsx';

import Login from './Login';
import { navLinks } from '@/utils/constants';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MobileMenuProp {
  session: Session,
}

const MobileMenu = ({
  session
}: MobileMenuProp) => {
  const linkClasses = clsx(
    'relative z-10 text-slate-700'
  );

  const underlineClasses = clsx(
    'absolute w-full z-20 mt-0.5 duration-500 border-b-2 opacity-0 border-slate-700 group-hover:opacity-100',
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          type='button'
          id='mobile-dropdown-button'
          className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
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
          <SheetTitle>RentEase</SheetTitle>
        </SheetHeader>
        <div className='' id='mobile-menu'>
          <div className='space-y-2 px-2 pb-3 ml-2'>
            { navLinks.map(item => (
              <div key={ item.title } className="group z-0" >
                <Link
                  href={ item.href }
                  className={ `${ linkClasses }` }
                >
                  <SheetClose>{ item.title }</SheetClose>
                  <div className={ underlineClasses }></div>
                </Link>
              </div>
            )) }
            { session ? (
              <div className="group mt-2 z-0" >
                <Link
                  href='/properties/add'
                  className={ `${ linkClasses }` }
                >
                  <SheetClose>Add Property</SheetClose>
                  <div className={ underlineClasses }></div>
                </Link>
              </div>
            ) : null }
            { !session ? <Login /> : null }
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu