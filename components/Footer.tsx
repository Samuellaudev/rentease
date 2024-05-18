import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import { socialLinks } from '@/utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <Link href='/' className="cursor-pointer">
            <Image
              className="w-20 md:w-24 -mt-4"
              src={ logo }
              alt="Logo"
            />
          </Link>
          <div className="flex flex-wrap justify-center -mx-4">
            <Link href="/" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-primary dark:hover:text-cyan-400" aria-label="Home"> Home </Link>
            <Link href="/properties" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-primary dark:hover:text-cyan-400" aria-label="Shop"> Properties </Link>
            <Link href="/privacy" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-primary dark:hover:text-cyan-400" aria-label="Privacy"> Privacy </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">&copy; { currentYear } RentEase All rights reserved</p>
          <div className="flex flex-row gap-2 space-x-8 md:space-x-6 mx-2 pt-4">
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
      </div>
    </footer>
  );
}

export default Footer;
