import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import CartStep from './Components/CartStep';

const cx = classNames.bind(styles);

const Cart = () => {
    return (
        <div className={cx('cart-page')}>
            <div className={cx('cart-left')}>
                <CartStep step={1} />
                <div className={cx('cart-content')}></div>
            </div>
            <div className={cx('cart-right')}></div>
        </div>
    );
};

export default Cart;
