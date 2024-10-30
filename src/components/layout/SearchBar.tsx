'use client';
import React, { ChangeEvent, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { useContext, useEffect, useState } from 'react';
import { CocktailContext } from '@/store/context/cocktailContext';
import { searchCocktails } from '@/services/cocktail';
import { usePathname } from 'next/navigation';

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>(searchText);
    const path = usePathname();
    const { dispatch } = useContext(CocktailContext);

    // useEffect(() => {
    //     if (searchText)
    //         searchCocktailsHandler(searchText)
    // }, [searchText]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchText]);

    useEffect(() => {
        if (debouncedSearch) {
            searchCocktailsHandler(debouncedSearch);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        setSearchText('')
    }, [path]);


    const searchTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const searchCocktailsHandler = async (searchText: string) => {
        dispatch({ type: 'SET_LOADER' });
        const cocktails = await searchCocktails(searchText);
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: cocktails });
    };

    return (
        <div
            className="bg-gray-100 border border-transparent dark:focus-within:border-white dark:focus-within:bg-zinc-400 flex px-6 rounded-full h-10 lg:w-2/4 mt-3 mx-auto max-lg:mt-6">
            <FontAwesomeIcon className="text-gray-600 mt-3 mr-3 rotate-90" icon={faSearch} />
            <input type='email' placeholder='Search...' value={searchText} onChange={searchTextHandler} onFocus={() => setSearchText('')}
                className="w-full outline-none bg-transparent dark:focus-within:text-white text-gray-600 font-semibold text-[15px]" />
        </div>
    );
}

export default SearchBar;
