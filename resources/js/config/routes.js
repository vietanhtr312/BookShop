const routes = {
    admin: {
        home: '/admin',
        productList: '/admin/products',
        productDetail: '/admin/product/:id',
        productCreate: '/admin/product/create',
        orderList: '/admin/orders',
        orderDetail: '/admin/order/:id',
    },

    user: {
        home: '/home',
        productList: '/products',
        productCategoryList: '/products/:category_id',
        productSearchList: '/products?search=:search',
        productDetail: '/product/:productId/:variantId',
        cart: '/cart',
        order: '/orders',
    },

    other: {
        login: '/login',
        register: '/register',
        home: '/home',
        forbidden: '/forbidden',
    },
};

export default routes;
