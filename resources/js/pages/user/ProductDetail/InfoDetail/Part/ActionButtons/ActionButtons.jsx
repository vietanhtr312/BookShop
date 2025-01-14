import classNames from 'classnames/bind';

import styles from './ActionButtons.module.scss';
import {Button} from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '~/hooks/useCart';
import { createOrder } from '~/services/orderService';

const cx = classNames.bind(styles);

const ActionButtons = ({ selected, productId, variantId, disabled }) => {
    const { handleAddToCart } = useCart();
    
    const addItemToCart = async () => {
        await handleAddToCart(variantId, selected.quantity);
    };

    const handleBuyProduct = async () => {
        const response = await createOrder({});
        console.log(response);
    }


    return (
        <div className={cx('action-btns')}>
            <Button primary onClick={addItemToCart} disabled={disabled}>
                Thêm vào giỏ hàng
            </Button>
            <Button primary onClick={handleBuyProduct}>
                Mua hàng
            </Button>
        </div>
    );
};

export default ActionButtons;
