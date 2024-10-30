'use client';
import CocktailCard from "@/components/card/Cocktail";
import { CocktailContext } from "@/store/context/cocktailContext";
import { ICocktail } from "@/types";
import { useContext } from "react";

const Favorites = () => {
    const { state } = useContext(CocktailContext);
    return (
        <div className="container my-12 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {state?.favorites?.map((cocktail: ICocktail) => (
                    <CocktailCard key={cocktail.idDrink} info={cocktail} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;
