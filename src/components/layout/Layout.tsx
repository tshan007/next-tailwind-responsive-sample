import { CocktailProvider } from '@/store/context/cocktailContext';
import Header from './Header';
import { ILayout } from '@/types';

const Layout = ({ children }: ILayout) => {
    return (
        <div>
            <CocktailProvider>
                <Header />
                <main>{children}</main>
            </CocktailProvider>
        </div>
    );
}

export default Layout;
