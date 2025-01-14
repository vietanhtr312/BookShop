import config from '~/config';
import pages from '~/pages';
import layouts from '~/layouts';

const publicRoutes = [
    { path: '/', component: pages.other.home, layout: layouts.user.default },
    { path: config.routes.other.home, component: pages.other.home, layout: layouts.user.default },
    { path: config.routes.other.login, component: pages.other.login, layout: layouts.other.noHeader },
    { path: config.routes.other.register, component: pages.other.register, layout: layouts.other.noHeader },

    { path: config.routes.user.productList, component: pages.user.Products, layout: layouts.user.default },
    { path: config.routes.user.productCategoryList, component: pages.user.Products, layout: layouts.user.default },
    { path: config.routes.user.productSearchList, component: pages.user.Products, layout: layouts.user.default },
    { path: config.routes.user.productDetail, component: pages.user.ProductDetail, layout: layouts.user.default },
    { path: config.routes.user.cart, component: pages.user.Cart, layout: layouts.user.default },
    { path: config.routes.user.order, component: pages.user.Order, layout: layouts.user.default },

    
];

const privateRoutes = [
    { path: config.routes.admin.productList, component: pages.admin.AdminProductList, role: 'admin' },
    { path: config.routes.admin.productDetail, component: pages.admin.AdminProductDetail, role: 'admin' },
    { path: config.routes.admin.productCreate, component: pages.admin.AdminProductCreate, role: 'admin' },
    { path: config.routes.admin.orderList, component: pages.admin.OrderList, role: 'admin' },
    { path: config.routes.admin.orderDetail, component: pages.admin.OrderDetail, role: 'admin' },

];

export { publicRoutes, privateRoutes };
