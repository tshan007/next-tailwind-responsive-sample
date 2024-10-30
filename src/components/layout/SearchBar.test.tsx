import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // for matchers like "toBeInTheDocument"
import { CocktailContext } from '@/store/context/cocktailContext';
import { searchCocktails } from '@/services/cocktail';
import SearchBar from './SearchBar';
import { ICocktail } from '@/types';

jest.mock('@/services/cocktail', () => ({
    searchCocktails: jest.fn(),
}));

type DispatchMock = jest.Mock;

describe('SearchBar Component', () => {
    const mockDispatch: DispatchMock = jest.fn();

    beforeEach(() => {
        mockDispatch.mockClear();
        (searchCocktails as jest.Mock).mockClear();
    });

    const renderWithContext = () => {
        return render(
            <CocktailContext.Provider value={{ dispatch: mockDispatch, state: { cocktailList: [], favorites: [], loader: false } }}>
                <SearchBar />
            </CocktailContext.Provider>
        );
    };

    test('should render search input', () => {
        renderWithContext();

        const inputElement = screen.getByPlaceholderText('Search...');
        expect(inputElement).toBeInTheDocument();
    });

    test('should update searchText and call searchCocktails API', async () => {
        const mockCocktails: ICocktail[] = [{ idDrink: '1', strDrink: 'Mojito', strCategory: 'Drink', strDrinkThumb: '' }];
        (searchCocktails as jest.Mock).mockResolvedValueOnce(mockCocktails);

        renderWithContext();

        const inputElement = screen.getByPlaceholderText('Search...');
        fireEvent.change(inputElement, { target: { value: 'Mojito' } });

        await waitFor(() => {
            expect(searchCocktails).toHaveBeenCalledWith('Mojito');
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'SET_SEARCH_RESULTS',
                payload: mockCocktails,
            });
        });
    });

    test('should not call searchCocktails API if searchText is empty', () => {
        renderWithContext();

        const inputElement = screen.getByPlaceholderText('Search...');
        fireEvent.change(inputElement, { target: { value: '' } });

        expect(searchCocktails).not.toHaveBeenCalled();
    });
});
