import config from '~/config';
import pages from '~/pages';
import layouts from '~/layouts';

const publicRoutes = [
    { path: config.routes.other.home, component: pages.other.home, layout: layouts.other.noHeader },
    { path: config.routes.other.login, component: pages.other.login, layout: layouts.other.noHeader },
    { path: config.routes.other.register, component: pages.other.register, layout: layouts.other.noHeader },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };
