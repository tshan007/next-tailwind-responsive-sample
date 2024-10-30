'use client';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { CocktailContext } from "@/store/context/cocktailContext";
import { ICocktailCard } from "@/types";

const Cocktail = ({ info }: ICocktailCard) => {
    const { state, dispatch } = useContext(CocktailContext);

    const addToFavHandler = () => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: info });
    };
    const removeFromFavHandler = () => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: info.idDrink });
    };

    const isFavorite = (id: string) => {
        return state.favorites.some(cocktail => cocktail.idDrink === id)
    }

    return (
        <div className="my-4 px-2 w-full md:w-1/2 lg:px-4 lg:w-1/3">
            <article className="overflow-hidden rounded-lg shadow-lg shadow-black-700/50 dark:bg-neutral-700 shadow-black-700/50 dark:bg-neutral-700">
                <a href="#">
                    <img alt="cocktail image" className="block h-auto w-full" src={info.strDrinkThumb} height={400} width={600} />
                </a>
                <header className="flex items-center justify-between leading-tight p-4">
                    <h1 className="text-lg">
                        <a className="no-underline hover:underline font-bold text-black-darker" href="#">
                            {info.strDrink}
                        </a>
                    </h1>
                </header>
                <footer className="flex items-center justify-between leading-none p-4">
                    <a className="flex items-center no-underline hover:underline text-black-darker" href="#">
                        <p className="text-sm">
                            {info.strCategory}
                        </p>
                    </a>
                    <button className="no-underline text-grey hover:text-red" onClick={isFavorite(info.idDrink) ? removeFromFavHandler : addToFavHandler}>
                        <span className="hidden">Like</span>
                        <FontAwesomeIcon data-testid='fav-heart' icon={faHeart} size="xl" className={`${isFavorite(info.idDrink) ? 'text-red-600' : 'text-grey-600'} hover:text-red-600`} title={isFavorite(info.idDrink) ? 'Remove from favorite' : 'Add to favorite'} />
                    </button>
                </footer>
            </article>
        </div>
    );
}

export default Cocktail;
