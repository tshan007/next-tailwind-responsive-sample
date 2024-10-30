'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children?: ReactNode;
  home?: boolean;
}

const NavLink = ({ href, children, home }: NavLinkProps) => {
  const path = usePathname();
  return (
    <li className='max-lg:border-b max-lg:py-3'><Link
      href={href}
      className={(home && path === href) || (!home && path.startsWith(href))
        ? 'hover:text-rose-300 text-[15px] text-rose-500 block font-bold'
        : 'hover:text-rose-300 text-[15px] block font-bold'}
    >
      {children}
    </Link>
    </li >
  );
}
export default NavLink;