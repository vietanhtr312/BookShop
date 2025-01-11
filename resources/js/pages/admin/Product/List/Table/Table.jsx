import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import styles from './Table.module.scss';
import { formatDate, formatPrice } from '~/utils/formarter';

const cx = classNames.bind(styles);

const Table = ({ products, handleDeleteProduct }) => {
    return (
        <div className={cx('product-table')}>
            <div className={cx('head')}>
                <div className={cx('id')}>STT</div>
                <div className={cx('avatar')}>Ảnh đại diện</div>
                <div className={cx('name')}>Tên sản phẩm</div>
                <div className={cx('price')}>Giá sản phẩm</div>
                <div className={cx('sold-quantity')}>Đã bán</div>
                <div className={cx('created-time')}>Ngày tạo</div>
                <div className={cx('view')}>Chi tiết</div>
                <div className={cx('delete')}>Xóa</div>
            </div>
            {products.length > 0 &&
                products.map((product, index) => (
                    <div className={cx('row')} key={index}>
                        <div className={cx('id')}>{index + 1}</div>
                        <div className={cx('avatar')}>
                            <img src={product.avatar} alt={product.name} />
                        </div>
                        <div className={cx('name')}>{product.name}</div>
                        <div className={cx('price')}>{formatPrice(product.price)}</div>
                        <div className={cx('sold-quantity')}>{product.sold_quantity}</div>
                        <div className={cx('created-time')}>{formatDate(product.created_at)}</div>
                        <div className={cx('view')}>
                            <Link to={`/admin/product/${product.id}`} className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faEye} />
                            </Link>
                        </div>
                        <div className={cx('delete')}>
                            <div className={cx('action-btn')} onClick={() => handleDeleteProduct(product.id)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Table;
