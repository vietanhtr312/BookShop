import styles from './CartModal.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { formatPrice } from "../../utils/formarter";
import images from '~/assets/images';

const cx = classNames.bind(styles);

const CartModal = ({  }) => {
    const carts = [
        {
            id: 1,
            title: 'Sách 1',
            images: images.cat_1,
            price: 10000,
            quantity: 2
        },
        {
            id: 2,
            title: 'Sách 2',
            images: images.cat_2,
            price: 20000,
            quantity: 1
        }
    ];
    return (
        <div className={cx('cart-modal')}>
            {(carts?.length > 0) ? (
                <div>
                    <h5>Giỏ hàng của bạn</h5>
                    <div className={cx('cart-modal-list')}>
                        {carts.map(cart => {
                            return (
                                <div key={cart?.id}>
                                    <div className={cx('cart-modal-item')}>
                                        <div className={cx('item-img')}>
                                            <img src={cart?.images} alt={cart.title} />
                                        </div>
                                        <div className={cx('item-info')}>
                                            <h6>{cart?.title}</h6>
                                            <span className={cx("item-price")}>{formatPrice(cart?.price)}</span>
                                            <span className={cx("item-multiply")}>x</span>
                                            <span className={cx("item-qty")}>{cart?.quantity}</span>
                                        </div>
                                    </div>
                                </div>)
                        })}
                        <Link to={''} className={cx('view-cart-btn')}>
                            <button className={cx('btn', 'btn--primary')}>Xem giỏ hàng</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={cx("cart-modal-empty")}>
                    <img src={images.emptyCart} alt='empty cart' />
                    <span>Chưa có sản phẩm</span>
                </div>
            )
            }
        </div>
    );
}

export default CartModal;
