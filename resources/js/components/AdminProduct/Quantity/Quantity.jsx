import { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Quantity.module.scss';
import { Input } from '~/components/Input';

const cx = classNames.bind(styles);

const Quantity = ({ quantity, index = 1 }) => {
    return (
        <div className={cx('size')}>
            <Input name={`size-${index}`} label="Size" value={quantity.size} disabled />
        </div>
    );
};

export default memo(Quantity);
