import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import styles from './Table.module.scss';
import { formatDate, formatPrice } from '~/utils/formarter';

const cx = classNames.bind(styles);

const Table = ({ orders }) => {
    return (
        <div className={cx('product-table')}>
            <div className={cx('head')}>
                <div className={cx('id')}>STT</div>
                <div className={cx('avatar')}>Tên khách hàng</div>
                <div className={cx('name')}>Trạng thái</div>
                <div className={cx('ship')}>Trạng thái giao hàng</div>
                <div className={cx('price')}>Giá sản phẩm</div>
                <div className={cx('sold-quantity')}>Tổng sản phẩm</div>
                <div className={cx('created-time')}>Ngày đặt</div>
                <div className={cx('view')}>Chi tiết</div>
            </div>
            {orders.length > 0 &&
                orders.map((order, index) => (
                    <div className={cx('row')} key={index}>
                        <div className={cx('id')}>{index + 1}</div>
                        <div className={cx('avatar')}>{order.user_name}</div>
                        <div className={cx('name')}>{order.status === 'pending' ? 'Chờ xử lý' : 'Đã xác nhận'}</div>
                        <div className={cx('ship')}>{order.shipping_status === 'unshipped' ? 'Chưa giao hàng' : 'Đang giao hàng'}</div>
                        <div className={cx('price')}>{formatPrice(order.total_price)}</div>
                        <div className={cx('sold-quantity')}>{order.total_quantity}</div>
                        <div className={cx('created-time')}>{formatDate(order.created_at)}</div>
                        <div className={cx('view')}>
                            <Link to={`/admin/order/${order.id}`} className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faEye} />
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Table;
