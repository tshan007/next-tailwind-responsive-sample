'use client';
import Link from 'next/link';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import SearchBar from './SearchBar';
import CollapseMenu from './CollapseMenu';
import { usePathname } from 'next/navigation';
config.autoAddCss = false; // Tell Font Awesome to not auto-inject CSS

const Header = () => {
  const path = usePathname();

  return (
    <header className='border-b bg-white dark:bg-neutral-600 font-sans min-h-[60px] px-7 py-3 relative tracking-wide relative z-50'>
      <div className='flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4'>
        <Link href="/" className='ml-1 hover:text-[#007bff] text-gray-600 dark:text-white font-bold text-[18px] lg:hover:fill-[#007bff] block'>
          Cocktail App
        </Link>
        <CollapseMenu />
      </div>
      {path === '/' && <SearchBar />}
    </header>
  );
}

export default Header;
