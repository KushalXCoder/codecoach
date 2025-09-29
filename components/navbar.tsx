"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Problems', href: '/dashboard/problems' },
    { name: 'Contests', href: '/dashboard/contests' },
    { name: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <nav className='w-full flex justify-between items-center px-20 py-5'>
        <h1 className='font-display text-3xl text-green-500'>CodeCoach</h1>
        <ul className='flex items-center gap-8 font-sans text-white'>
            {navLinks.map((link,index) => (
                <Link
                    key={index}
                    href={link.href}
                    className={`${pathname.split('/')[2] === link.href.split('/')[1] ? `text-green-500` : ``}`}
                >
                    {link.name}
                </Link>
            ))}
        </ul>
    </nav>
  )
}

export default Navbar