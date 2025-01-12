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
        productCategoryList: '/products/:category_id',
        productSearchList: '/products?search=:search',
        productDetail: '/product/:productId/:variantId',
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
