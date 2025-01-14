import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import Content from '~/components/ContentWrap/Content';
import Table from './Table/Table';
import Pagination from '~/components/PageComp/Pagination';
import LoadingPage from '~/pages/other/Loading';
import { ToastContainer, toast } from 'react-toastify';
import { getOrders } from '~/services/orderService';

const cx = classNames.bind(styles);

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        link: '/',
    },
    {
        title: 'Đơn hàng - Danh sách đơn hàng',
        link: '/admin/orders',
    },
];

const OrderList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    const [totalPage, setTotalPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async (page) => {
        setLoading(true);
        try {
            const response = await getOrders(page, 10);
            console.log('response', response);
            setOrders(response.orders.data);
            setTotalPage(response.orders.meta.last_page);
        } catch (error) {
            console.log('Không thể lấy được dữ liệu sản phẩm', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(page);
        window.scrollTo(0, 0);
    }, [page]);

    const handlePageChange = (page) => {
        setSearchParams({ page: page });
    }


    return (
        <Content breadcrumb={BREADCRUMB} className="grid wide">
            <div className={cx('admin-product-list')}>
                {loading ? <LoadingPage /> : <Table orders={orders} />}
                <Pagination current={page} total={totalPage} setPage={handlePageChange} />
            </div>
            <ToastContainer />
        </Content>
    );
};

export default OrderList;
