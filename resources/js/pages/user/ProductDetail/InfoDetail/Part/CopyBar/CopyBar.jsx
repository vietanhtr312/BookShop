import classNames from 'classnames/bind';

import styles from './CopyBar.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const CopyBar = ({ variants = [], productId, id, copies }) => {
    const navigate = useNavigate();

    const handleClickDot = (variantId) => {
        navigate(`/product/${productId}/${variantId}`);
    };

    return (
        <div className={cx('copy-bar')}>
            {variants.length > 0 &&
                variants.map((variant, index) => (
                    <Button key={`copy-${index}`} text onClick={() => handleClickDot(variant.id)} active={variant.id === id}>
                        {copies.find((copy) => copy.id === variant.copy_id)?.name}
                    </Button>
                ))}
        </div>
    );
};

export default CopyBar;
