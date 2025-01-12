import { createContext, useEffect, useState } from 'react';
import { addToCart, getCarts, udpateCart } from '~/services/cartService';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const userId = 1;
    const [cartData, setCartData] = useState({});
    const [cartItem, setCartItem] = useState({
        variant_id: '',
        quantity: '',
        user_id: '',
    });

    const fetchCarts = async () => {
        const response = await getCarts(userId);
        setCartData(response.data);
    };

    useEffect(() => {
        if (userId) {
            fetchCarts();
        } else {
            setCartData({});
        }
    }, [userId]);

    const handleAddToCart = async (variantId, quantity) => {
        const cartItem = {
            variant_id: variantId,
            quantity: quantity,
            user_id: userId,
        };
        await addToCart(cartItem);
        await fetchCarts();
    };

    const handleUpdateCart = async (cartId, quantity) => {
        await udpateCart(cartId, quantity);
        await fetchCarts();
    };

    return (
        <CartContext.Provider value={{ cartData, cartItem, setCartItem, handleAddToCart, handleUpdateCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
