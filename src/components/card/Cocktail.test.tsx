import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ICocktail, ICocktailState } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Dispatch } from 'react';
import Cocktail from './Cocktail';

const mockCocktail: ICocktail = {
    idDrink: '11007',
    strDrink: 'Margarita',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    strCategory: 'Cocktail',
};

const mockDispatch = jest.fn();
let mockState: ICocktailState = {
    favorites: [],
    cocktailList: [],
    loader: false,
};

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => ({ state: mockState, dispatch: mockDispatch })
}));

describe('Cocktail Component', () => {
    it('should render the cocktail details correctly', () => {
        render(<Cocktail info={mockCocktail} />);

        expect(screen.getByText('Margarita')).toBeInTheDocument();
        expect(screen.getByText('Cocktail')).toBeInTheDocument();
        expect(screen.getByAltText('cocktail image')).toHaveAttribute('src', mockCocktail.strDrinkThumb);
    });

    it('should handle adding to favorites', () => {
        render(<Cocktail info={mockCocktail} />);

        const heartButton = screen.getByRole('button');

        fireEvent.click(heartButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'ADD_TO_FAVORITES',
            payload: mockCocktail
        });
    });

    it('should handle removing from favorites when already favorited', () => {
        mockState.favorites = [mockCocktail];

        render(<Cocktail info={mockCocktail} />);

        const heartButton = screen.getByRole('button');

        fireEvent.click(heartButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'REMOVE_FROM_FAVORITES',
            payload: mockCocktail.idDrink
        });
    });

    it('should display the heart icon as filled when cocktail is in favorites', () => {
        mockState.favorites = [mockCocktail];

        render(<Cocktail info={mockCocktail} />);

        const heartIcon = screen.getByTestId('fav-heart');
        expect(heartIcon).toHaveClass('text-red-600');
    });

    it('should display the heart icon as empty when cocktail is not in favorites', () => {
        mockState.favorites = [];

        render(<Cocktail info={mockCocktail} />);

        const heartIcon = screen.getByTestId('fav-heart');
        expect(heartIcon).toHaveClass('text-grey-600');
    });
});
