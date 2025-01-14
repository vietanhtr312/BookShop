import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';

import Content from '~/components/ContentWrap/Content';
import LoadingPage from '~/pages/other/Loading';
import { getOrder, confirmOrder } from '~/services/orderService';
import { formatPrice } from '~/utils/formarter';
import { Button } from '~/components/Button';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        link: '/',
    },
    {
        title: 'Đơn hàng - Danh sách',
        link: '/admin/orders',
    },
    {
        title: 'Chi tiết',
    },
];

const OrderDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const [carts, setCarts] = useState({});

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const response = await getOrder(id);
            console.log('response', response);
            setOrder(response.order);
            setCarts(response.order.carts);
        } catch (error) {
            console.log('Lỗi lấy thông tin đơn hàng', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrder();
    }, [])

    const handleConfirmOrder = async () => {
        try {
            const response = await confirmOrder(id);
            console.log('response', response);
            toast.success(response.message);
            setTimeout(() => {
                navigate('/admin/orders');
            }, 3000);
        } catch (error) {
            console.log('Lỗi xác nhận đơn hàng', error);
        }
    }


    return (
        <Content breadcrumb={BREADCRUMB}>
            {!loading ? (
                <div className={cx('order')}>
                    <div className={cx('order-left')}>
                        <h3>Thông tin đơn hàng - {order.status === 'pending' ? 'Chờ xử lý' : 'Đã xác nhận'}
                            {order.shipping_status === 'unshipped' ? '' : ' - Đang giao hàng'}
                        </h3>
                        <div className={cx('order-left-table')}>
                            <table>
                                <tbody>
                                    {carts.length > 0 && carts.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={item?.variant?.images[item.variant.images.length - 1]} alt="" /></td>
                                                <td><p>{item?.variant?.product?.name} - {item?.variant?.copy_name}</p></td>
                                                <td className={cx('quantity')}>x {item?.quantity}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('order-left-total')}>
                            <p>Tổng cộng: <span>{formatPrice(order.total_price)}</span></p>
                        </div>
                    </div>
                    <div className={cx('order-right')}>
                        <div className={cx('order-right-payment')}>
                            <h3>Phương thức thanh toán</h3>
                            <p>{order.payment_method}</p>
                        </div>
                        <div className={cx('order-right-delivery')}>
                            <h3>Thông tin giao hàng</h3>
                            <p>Tên: {order.user_name}</p>
                            <p>Điện thoại: {order.shipping_phone}</p>
                            <p>Địa chỉ: {order.shipping_address}</p>
                        </div>
                    </div>

                    <div className={cx('order-action')}>
                        <Button secondary onClick={() => navigate('/admin/orders')} className={cx('btn-back')}>Quay lại</Button>
                        {order.status === 'pending' && <Button primary onClick={() => handleConfirmOrder()} className={cx('btn-confirm')}>Xác nhận</Button>}
                    </div>
                </div>
            ) : (
                <LoadingPage />
            )}
            <ToastContainer />
        </Content>
    );
};

export default OrderDetail;
