import classNames from 'classnames/bind';
import styles from './InfoDetail.module.scss';
import { formatPrice } from '~/utils/formarter';
import { useEffect, useState } from 'react';
import ActionButtons from './Part/ActionButtons';
import InformationBox from './Part/InformationBox';

const cx = classNames.bind(styles);

const InfoDetail = ({ product, variant }) => {
    const [selected, setSelected] = useState({ size: '', quantity: 1 });
    const [disabled, setDisabled] = useState(false);

    const handleChangeQuantity = (quantity) => {
        setSelected((prev) => ({ ...prev, quantity }));
    };

    return (
        <div className={cx('info-detail')}>
            <div className={cx('name')}>{product.name}</div>
            <div className={cx('category')}>Danh mục: {product.category_name}</div>
            <div className={cx('price')}>
                <span>{formatPrice(product.price)}</span>
                {product.sale !== 'not' && (
                    <div className={cx('original-price')}>{formatPrice(product.original_price)}</div>
                )}
            </div>
            <div className={cx('quantity')}>
                <span>Số lượng: </span>
            </div>
            <ActionButtons selected={selected} productId={product.id} variantId={variant?.id || null} disabled={disabled} />
            <InformationBox intro={product.intro} detail={product.detail} />
        </div>
    );
};

export default InfoDetail;
