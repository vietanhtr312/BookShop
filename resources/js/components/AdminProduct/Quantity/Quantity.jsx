import { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Quantity.module.scss';
import { Input } from '~/components/Input';

const cx = classNames.bind(styles);

const Quantity = ({ quantity, setQuantity, index = 1 }) => {
    return (
        <div className={cx('quantity')}>
            <Input name={`quantity-${index}`} type="number" label="Quantity" value={quantity} onChange={setQuantity}/>
        </div>
    );
};

export default memo(Quantity);
