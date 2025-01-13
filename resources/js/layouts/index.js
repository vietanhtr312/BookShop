import UserLayout from './user/Default/UserLayout';
import NoHeaderLayout from './other/NoHeader/NoHeaderLayout';
import AdminLayout from './admin/Default';

const layouts = {
    admin: {
        default: AdminLayout,
    },

    user: {
        default: UserLayout,
    },

    other: {
        noHeader: NoHeaderLayout,
    },
};

export default layouts;
