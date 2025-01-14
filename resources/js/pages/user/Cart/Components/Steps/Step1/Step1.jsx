import style from './Step1.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '~/hooks/useCart';
import images from '~/assets/images';
import { formatPrice } from '~/utils/formarter';
import { useEffect } from 'react';
import LoadingPage from '~/pages/other/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { QuantityButton } from '~/components/Button';



const cx = classNames.bind(style);

function Step1({ onSubmit, next = false, setNext = () => { }, setEmptyCart }) {
    const [loading, setLoading] = useState(true);
    const { cartData, fetchCarts, handleDeleteCart, handleDeleteCarts } = useCart();

    useEffect(() => {
        if (cartData) {
            setLoading(false);
        } else {
            fetchCarts();
        }
    }, []);

    const carts = cartData.carts || [];
    // console.log(carts);

    useEffect(() => {
        if (next) {
            onSubmit(cartData);
            setNext(false);
        }
    }, [next]);

    if (carts.length === 0) {
        setEmptyCart(true);
        return (
            loading ? <LoadingPage /> :
                <div>
                    <div className={cx('cartpage--empty')}>
                        <img src={images.emptyCart} alt='empty cart' />
                        <h4>Your cart is empty</h4>
                        <Link to={'/products'} className={cx('btn', 'btn--primary')}>Go to Products</Link>
                    </div>
                </div>
        )
    }

    return (
        <div>
            {/* {loading ? <LoadingPage /> : */}
            <div className={cx('cartpage')}>
                <div className={cx("grid wide")}>
                    <div className={cx("container")}>
                        <div className={cx("cartpage-head")}>
                            <table className={cx('cartpage-table')}>
                                <tr>
                                    <th>STT</th>
                                    <th>Sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá sản phẩm</th>
                                    <th>SL</th>
                                    <th>Thành tiền</th>
                                    <th>Xóa</th>
                                </tr>
                            </table>
                            <div className={cx('cartpage-body')}>
                                <div className={cx('cartpage-table')}>
                                    <table>
                                        <tbody>
                                            {carts.length > 0 && carts.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td><img src={item?.variant?.images[0]} alt="" /></td>
                                                        <td><p>{item?.variant?.product?.name} - {item?.variant?.copy_name}</p></td>
                                                        <td className={cx('price')}><p>{formatPrice(item?.variant?.product?.price)}</p></td>
                                                        <td className={cx('quantity')}><QuantityButton cartId={item.id} quantity={item?.quantity} /></td>
                                                        <td className={cx('price')}><p>{formatPrice(item?.variant?.product?.price * item?.quantity)}</p></td>
                                                        <td className={cx('action')}><button onClick={() => handleDeleteCart(item.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className={cx('cartpage-foot', 'row')}>
                                <div className={cx('cartpage-clear', 'col')}>
                                    <button className='btn' onClick={() => { handleDeleteCarts() }}>
                                        <i className="fas fa-trash-alt"></i>
                                        <span>Xóa giỏ hàng</span>
                                    </button>
                                </div>

                                <div className={cx('cartpage-total', 'col c-4')}>
                                    <p>Tổng cộng ({cartData?.count}) sản phẩm: <span>{formatPrice(cartData?.total)}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* // } */}
        </div>
    )

}

export default Step1;