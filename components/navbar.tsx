"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Problems', href: '/problems' },
    { name: 'Contests', href: '/contests' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <nav className='w-full sticky top-0 py-5 z-10 backdrop-blur-2xl'>
      <div className='max-w-6xl mx-auto flex justify-between items-center px-12'>
          <h1 className='font-display text-3xl text-primary'>CodeCoach</h1>
          <ul className='flex items-center gap-8 font-sans text-white'>
              {navLinks.map((link,index) => (
                (
                  <Link
                      key={index}
                      href={link.href}
                      className="hover:text-blue-500"
                  >
                      {link.name}
                  </Link>
                )
              ))}
          </ul>
      </div>
    </nav>
  )
}

export default Navbar