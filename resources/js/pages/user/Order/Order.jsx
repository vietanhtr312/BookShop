import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserOders } from '~/services/orderService';
import LoadingPage from '~/pages/other/Loading';
import { formatPrice } from '~/utils/formarter';
import { Button } from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Order = () => {
    const [orders, setOrders] = useState({});
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserOrders = async () => {
            setLoading(true)
            try {
                const response = await getUserOders(userId);
                console.log('response', response);
                setOrders(response.orders);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        fetchUserOrders();
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            const tempCarts = {};
            orders.map((order, index) => {
                tempCarts[index] = order.carts;
            });
            setCarts(tempCarts);
        }
    }, [orders]);

    return (
        <>
            {!loading ? (
                <div className={cx('order-page')}>
                    <div className={cx('order', 'grid wide')}>
                        <div className={cx('order-left')}>
                            {orders.length > 0 ? (
                                orders.map((order, index) => {
                                    return (
                                        <div className={cx('order-item')}>
                                            <h3>Thông tin đơn hàng {index + 1} - {order.status === 'pending' ? 'Chờ xử lý' : 'Đã xác nhận'}
                                                {order.shipping_status === 'unshipped' ? '' : ' - Đang giao hàng'}
                                            </h3>
                                            <div className={cx('order-left-table')}>
                                                <table>
                                                    <tbody>
                                                        {carts[`${index}`]?.length > 0 && carts[`${index}`].map((item, index) => {
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
                                    )
                                })
                            ) : (
                                <div>
                                    <div className={cx('order--empty')}>
                                        <img src={images.emptyCart} alt='empty cart' />
                                    </div>
                                </div>
                            )}
                            <Button
                                secondary
                                type="button"
                                onClick={() => navigate('/')}
                                leftIcon={<FontAwesomeIcon icon={faHome} />}
                            >
                                Quay về trang chủ
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <LoadingPage />
            )}
        </>
    );
};

export default Order;
