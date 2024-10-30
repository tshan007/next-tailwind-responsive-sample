import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const getRandomCocktails = async () => {
    try {
        const requests = Array.from({ length: 5 }, () => axios.get(`${BASE_URL}random.php`));
        const results = await Promise.all(requests);
        const cocktails = results.map(res => res.data.drinks[0]);

        const uniqueCocktails = Array.from(new Set(cocktails.map(c => c.idDrink)))
            .map(id => cocktails.find(c => c.idDrink === id));
        return uniqueCocktails?.slice(0, 5);
    } catch (error) {
        console.log(error);
        return [];
    }

};

export const searchCocktails = async (query: string) => {
    const response = await axios.get(`${BASE_URL}search.php?s=${query}`);
    return response?.data?.drinks || [];
};