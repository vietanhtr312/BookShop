import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import GlobalStyles from './components/GlobalStyles';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <React.StrictMode>
        <GlobalStyles>
            <AuthProvider>
                <CartProvider>
                    <SearchProvider>
                        <App />
                    </SearchProvider>
                </CartProvider>
            </AuthProvider>
        </GlobalStyles>
    </React.StrictMode>,
);
