'use client';

import Cocktail from "@/components/card/Cocktail";
import Loader from "@/components/loader/Loader";
import { getRandomCocktails } from "@/services/cocktail";
import { CocktailContext } from "@/store/context/cocktailContext";
import { ICocktail as CocktailProps } from "@/types";
import { Suspense, useContext, useEffect } from "react";

const Home = () => {
  const { state, dispatch } = useContext(CocktailContext);

  const fetchCocktails = async () => {
    dispatch({ type: 'SET_LOADER' });
    const randomCocktails = await getRandomCocktails();
    dispatch({ type: 'SET_RANDOM_COCKTAILS', payload: randomCocktails });
  };

  useEffect(() => {
    fetchCocktails();
  }, []);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {state.loader && <Loader />}
        {state?.cocktailList?.length > 0 ?
          state?.cocktailList.map((cocktail: CocktailProps) => (
            <Cocktail key={cocktail.idDrink} info={cocktail} />
          )) :
          <span>No cocktails to display</span>
        }
      </div>
    </div>
  );
}

export default Home;
