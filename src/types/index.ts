import { ReactNode } from "react";

export interface ICocktail {
    idDrink: string;
    strDrink: string;
    strCategory: string;
    strDrinkThumb: string;
}

export interface ICocktailCard {
    info: ICocktail;
}

export interface ICocktailState {
    cocktailList: ICocktail[];
    favorites: ICocktail[];
    loader: boolean;
}

export interface ILayout {
    children: ReactNode;
}

export type ICocktailAction =
    | { type: 'SET_LOADER'; }
    | { type: 'SET_RANDOM_COCKTAILS'; payload: ICocktail[] }
    | { type: 'SET_SEARCH_RESULTS'; payload: ICocktail[] }
    | { type: 'ADD_TO_FAVORITES'; payload: ICocktail }
    | { type: 'REMOVE_FROM_FAVORITES'; payload: string };
