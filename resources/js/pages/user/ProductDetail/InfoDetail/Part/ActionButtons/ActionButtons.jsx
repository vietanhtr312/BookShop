import classNames from 'classnames/bind';

import styles from './ActionButtons.module.scss';
import {Button} from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ActionButtons = ({ selected, productId, variantId, disabled }) => {

    const addItemToCart = () => {};

    return (
        <div className={cx('action-btns')}>
            <Button primary onClick={addItemToCart} disabled={disabled}>
                Thêm vào giỏ hàng
            </Button>
            <Button primary disabled={disabled}>
                Mua hàng
            </Button>
            <Button primary className={cx('favorite-btn')}>
                <FontAwesomeIcon icon={faHeart} />
            </Button>
        </div>
    );
};

export default ActionButtons;
