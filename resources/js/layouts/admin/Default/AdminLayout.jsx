import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './AdminLayout.module.scss';
import Navbar from '~/components/PageComp/Navbar/Navbar';
import Header from '../components/Header';
import Sidebar from '~/components/PageComp/Sidebar';
import config from '~/config';
import { useAuth } from '~/hooks/useAuth';

const cx = classNames.bind(styles);

const ITEMS = [
    {
        type: 'dashboard',
        title: 'Trang chủ',
        to: '/',
    },
    {
        type: 'product',
        title: 'Sản phẩm',
        children: [
            {
                type: 'product_create',
                title: 'Thêm mới',
                to: config.routes.admin.productCreate,
            },
            {
                type: 'product_list',
                title: 'Danh sách',
                to: config.routes.admin.productList,
            },
        ],
    },
    {
        type: 'orders',
        title: 'Đơn hàng',
        children: [
            {
                type: 'order_list',
                title: 'Danh sách',
                to: config.routes.admin.orderList,
            },
        ],
    },
    {
        type: 'customers',
        title: 'Khách hàng',
        to: '/admin/users',
    },
    {
        type: 'revenue',
        title: 'Doanh thu',
        to: config.routes.admin.productDetail,
    },
];

function AdminLayout({ children }) {
    const { user, handleLogout } = useAuth();
    return (
        <div className={cx('admin-layout')}>
            <Navbar handleLogout={handleLogout}/>
            <Header />
            <div className={cx('body')}>
                <div className={cx('body-left')}>
                    <Sidebar items={ITEMS} />
                </div>
                <div className={cx('body-right')}>{children}</div>
            </div>
            <div className={cx('footer')}></div>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
