'use client';
import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { cocktailReducer, initialState } from '../reducers/cocktailReducer';
import { ICocktailAction, ICocktailState } from '@/types';

interface CocktailContextProps {
  state: ICocktailState;
  dispatch: Dispatch<ICocktailAction>;
}

export const CocktailContext = createContext<CocktailContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const CocktailProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cocktailReducer, initialState);

  return (
    <CocktailContext.Provider value={{ state, dispatch }}>
      {children}
    </CocktailContext.Provider>
  );
};