import { ICocktailAction, ICocktailState } from "@/types";

export const initialState: ICocktailState = {
    cocktailList: [],
    favorites: [],
    loader: false,
};

export const cocktailReducer = (state: ICocktailState, action: ICocktailAction): ICocktailState => {
    switch (action.type) {
        case 'SET_LOADER':
            return {
                ...state,
                loader: true,
            };
        case 'SET_RANDOM_COCKTAILS':
            return {
                ...state,
                cocktailList: action.payload,
                loader: false,
            };

        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                cocktailList: action.payload,
                loader: false,
            };

        case 'ADD_TO_FAVORITES':
            if (!state.favorites.some(cocktail => cocktail.idDrink === action.payload.idDrink)) {
                return {
                    ...state,
                    favorites: [...state.favorites, action.payload],
                };
            }
            return state;

        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter(cocktail => cocktail.idDrink !== action.payload),
            };

        default:
            return state;
    }
};
