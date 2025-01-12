import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import GlobalStyles from './components/GlobalStyles';
import { CartProvider } from './context/CartContext';

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <React.StrictMode>
        <GlobalStyles>
            <CartProvider>
                <App />
            </CartProvider>
        </GlobalStyles>
    </React.StrictMode>,
);
