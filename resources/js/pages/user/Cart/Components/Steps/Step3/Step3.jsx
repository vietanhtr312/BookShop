import styles from './Step3.module.scss';
import classNames from 'classnames/bind';
import { formatPrice } from '~/utils/formarter';

const cx = classNames.bind(styles);


const Step3 = ({ cartData, paymentInfo }) => {
    const carts = cartData.carts || [];

    return (
        <div className={cx('order')}>
            <div className={cx('order-left')}>
                <h3>Đơn hàng của bạn</h3>
                <div className={cx('order-left-table')}>
                    <table>
                        <tbody>
                            {carts.length > 0 && carts.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={item?.variant?.images[0]} alt="" /></td>
                                        <td><p>{item?.variant?.product?.name} - {item?.variant?.copy_name}</p></td>
                                        <td className={cx('quantity')}>x {item?.quantity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={cx('order-left-total')}>
                    <p>Tổng cộng: <span>{formatPrice(cartData.total)}</span></p>
                </div>
            </div>
            <div className={cx('order-right')}>
                <div className={cx('order-right-payment')}>
                    <h3>Phương thức thanh toán</h3>
                    <p>{paymentInfo.payment}</p>
                </div>
                <div className={cx('order-right-delivery')}>
                    <h3>Thông tin giao hàng</h3>
                    <p>Tên: {paymentInfo.name}</p>
                    <p>Điện thoại: {paymentInfo.phone}</p>
                    <p>Địa chỉ: {paymentInfo.deliveryAddress}</p>
                </div>
            </div>
        </div>
    );
}


export default Step3;