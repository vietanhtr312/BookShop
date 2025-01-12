const routes = {
    admin: {
        home: '/admin',
        productList: '/admin/products',
        productDetail: '/admin/product/:id',
        productCreate: '/admin/product/create',
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
