'use client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRefresh, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from 'react';
import NavLink from './NavLink';
import { usePathname } from 'next/navigation';
import { getRandomCocktails } from '@/services/cocktail';
import { CocktailContext } from '@/store/context/cocktailContext';
config.autoAddCss = false; // Tell Font Awesome to not auto-inject CSS

const CollapseMenu = () => {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { dispatch } = useContext(CocktailContext);

  useEffect(() => {
    setMenuOpen(false)
  }, [path]);

  const fetchCocktailsHandler = async () => {
    dispatch({ type: 'SET_LOADER' });
    const randomCocktails = await getRandomCocktails();
    dispatch({ type: 'SET_RANDOM_COCKTAILS', payload: randomCocktails });
  };

  const menuToggleHandler = () => {
    setMenuOpen(!menuOpen);
  }
  const menuCloseHandler = () => {
    setMenuOpen(false);
  }

  return (
    <>
      <div id="collapseMenu"
        className={`max-lg:${!menuOpen && 'hidden'} lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50`}>
        {/* className={`max-lg:hidden lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50`}> */}
        <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3' onClick={menuCloseHandler}>
          <FontAwesomeIcon className="w-6 text-black" size='xl' icon={faXmark} />
        </button>
        <ul
          className='lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 max-lg:fixed max-lg:bg-zinc-600 max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
          <NavLink href='/' home={true}>
            Home
          </NavLink>
          <NavLink href='/favorites'>
            Favorites
          </NavLink>
        </ul>
      </div>
      <div className='flex items-center ml-auto space-x-2'>
        <button className='lg' onClick={fetchCocktailsHandler}>
          <FontAwesomeIcon className="mr-3" size="xl" icon={faRefresh} />
        </button>
        <button id="toggleOpen" className='lg:hidden' onClick={menuToggleHandler}>
          <FontAwesomeIcon className="w-8 h-8 text-[15px]" size="xl" icon={faBars} />
        </button>
      </div>
    </>
  );
}

export default CollapseMenu;
