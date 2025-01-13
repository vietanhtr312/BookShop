import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import images from "~/assets/images";
import { useState } from "react";
import { formatPrice } from "~/utils/formarter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const ProductCard = ({product}) => {
    const [variant, setVariant] = useState(product?.variants?.[0] || {});
    
    return (
        <Link to = {`/product/${product?.id}/${variant.id}`} key = {product?.id}>
            <div className={cx('featured-item')}>
                <div className={cx('featured-item-pic')}
                    style={{ backgroundImage: `url(${product?.avatar ?? images.prod1})` }}>
                    <ul>
                        <li><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></li>
                        <li><FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon></li>
                    </ul>
                </div>
                <div className={cx('featured-item-text')}>
                    <h6>{product?.name}</h6>
                    <h5>{formatPrice(product?.price)}</h5>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;