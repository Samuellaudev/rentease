import { IoHomeOutline, IoSearchCircleOutline } from "react-icons/io5";

// Navbar
export const navLinks = [
  {
    href: '/',
    title: 'Home',
    icon: <IoHomeOutline className='text-black text-xl mx-2 group-hover:text-white' />
  },
  {
    href: '/properties',
    title: 'Properties',
    icon: <IoSearchCircleOutline className='text-black text-xl mx-2 group-hover:text-white' />
  }
]

export const socialLinks = [
  {
    href: 'https://github.com/',
    src: '/images/icon-github.svg',
    alt: 'Github Icon',
  },
  {
    href: 'https://www.linkedin.com/',
    src: '/images/icon-linkedin.svg',
    alt: 'Linkedin Icon',
  },
  {
    href: 'https://www.instagram.com/',
    src: '/images/icon-instagram.svg',
    alt: 'Instagram',
  },
  {
    href: 'https://www.twitter.com/',
    src: '/images/icon-twitter.svg',
    alt: 'Twitter',
  },
];