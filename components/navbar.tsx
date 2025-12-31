"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileSheet from './profile/profile-sheet';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Problems', href: '/problems' },
    { name: 'Contests', href: '/dashboard/contests' },
    { name: 'Profile', href: '/' },
  ];

  return (
    <nav className='h-[10%] w-full flex justify-between items-center sticky top-0 py-5 z-10'>
        <h1 className='font-display text-3xl text-primary'>CodeCoach</h1>
        <ul className='flex items-center gap-8 font-sans text-white'>
            {navLinks.map((link,index) => (
              link.name === 'Profile' ? (
                <ProfileSheet />
              ) : (
                <Link
                    key={index}
                    href={link.href}
                    className={`${pathname.split('/')[2] === link.href.split('/')[1] ? `text-primary` : ``}`}
                >
                    {link.name}
                </Link>
              )
            ))}
        </ul>
    </nav>
  )
}

export default Navbar