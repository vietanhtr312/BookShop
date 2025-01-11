const routes = {
    admin: {
    },

    user: {
        home: '/home',
        productList: '/products',
        productDetail: '/product/:productId',
        cart: '/cart',
    },

    other: {
        login: '/login',
        register: '/register',
        home: '/home',
        forbidden: '/forbidden',
    },
};

export default routes;
