import config from '~/config';
import pages from '~/pages';
import layouts from '~/layouts';

const publicRoutes = [
    { path: '/', component: pages.other.home, layout: layouts.user.default },
    { path: config.routes.other.home, component: pages.other.home, layout: layouts.user.default },
    { path: config.routes.other.login, component: pages.other.login, layout: layouts.other.noHeader },
    { path: config.routes.other.register, component: pages.other.register, layout: layouts.other.noHeader },

    { path: config.routes.user.productList, component: pages.user.Products, layout: layouts.user.default },
    { path: config.routes.user.productDetail, component: pages.user.ProductDetail, layout: layouts.user.default },

    { path: config.routes.admin.productList, component: pages.admin.AdminProductList, layout: layouts.admin.default },
    { path: config.routes.admin.productCreate, component: pages.admin.AdminProductCreate, layout: layouts.admin.default },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };
