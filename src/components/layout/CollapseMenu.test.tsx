import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CocktailContext } from '@/store/context/cocktailContext';
import { getRandomCocktails } from '@/services/cocktail';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';
import CollapseMenu from './CollapseMenu';

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: ({ icon }: { icon: any }) => <span>{icon}</span>,
}));

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('@/services/cocktail', () => ({
    getRandomCocktails: jest.fn(),
}));

describe('CollapseMenu', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/');
        (getRandomCocktails as jest.Mock).mockResolvedValue([
            { idDrink: '1', strDrink: 'Margarita', strCategory: 'Cocktail', strDrinkThumb: '/margarita.jpg' },
            { idDrink: '2', strDrink: 'Martini', strCategory: 'Cocktail', strDrinkThumb: '/martini.jpg' },
        ]);

        render(
            <CocktailContext.Provider value={{ dispatch: mockDispatch, state: { cocktailList: [], favorites: [], loader: false } }}>
                <CollapseMenu />
            </CocktailContext.Provider>
        );
    });

    it('should toggle the menu when clicking the open/close buttons', () => {
        expect(screen.queryByText('Favorites')).not.toBeInTheDocument();

        const openButton = screen.getByRole('button', { name: /fa-bars/i });
        fireEvent.click(openButton);
        expect(screen.getByText('Favorites')).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: /fa-xmark/i });
        fireEvent.click(closeButton);
        expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
    });

    it('should fetch random cocktails and dispatch them', async () => {
        const refreshButton = screen.getByRole('button', { name: /fa-refresh/i });
        fireEvent.click(refreshButton);

        await waitFor(() => {
            expect(getRandomCocktails).toHaveBeenCalled();
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'SET_RANDOM_COCKTAILS',
                payload: [
                    { idDrink: '1', strDrink: 'Margarita', strCategory: 'Cocktail', strDrinkThumb: '/margarita.jpg' },
                    { idDrink: '2', strDrink: 'Martini', strCategory: 'Cocktail', strDrinkThumb: '/martini.jpg' },
                ],
            });
        });
    });

    it('should close the menu when the path changes', () => {
        (usePathname as jest.Mock).mockReturnValue('/favorites');

        const openButton = screen.getByRole('button', { name: /fa-bars/i });
        fireEvent.click(openButton);
        expect(screen.getByText('Favorites')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Favorites'));
        expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
    });
});
