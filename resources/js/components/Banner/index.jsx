import { Link } from 'react-router-dom';
import { useState } from 'react';
import images from '~/assets/images';
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Banner({categories}) {
    const [isShowCategory, setIsShowCategory] = useState(true);

    return (
        <div>
            <div className={cx('category-wrapper')}>
                <div className='grid wide'>
                    <div className='row'>
                        <div className='col l-2 m-12 c-12'>
                            <nav className={cx('category')}>
                                <h3 onClick={() => { setIsShowCategory(!isShowCategory) }}>
                                    <i className='fa-solid fa-list'></i>
                                    Tất Cả Danh Mục</h3>

                                <ul className={isShowCategory ? cx('') : cx('hidden')}>
                                    <li className={cx('main')}>
                                        <Link to={'/'}>Nhà Sách Online</Link>
                                    </li>
                                    {categories && categories?.map((category, index) => (
                                            <li key={index}>
                                                <Link to={`products/category/${category?.name}`}>{category?.name}</Link>
                                            </li>
                                        ))}
                                </ul>
                            </nav>
                        </div>
                        <div className='col l-10 m-12 c-12'>
                            <div className={cx('banner')} style={{ backgroundImage: `url(${images.banner})` }}>
                                <div className={cx('banner-text')}>
                                    <span>Sách trong nước và nước ngoài</span>
                                    <h2>Sách chính hãng 100%</h2>
                                    <p>Miễn phí giao hàng trên toàn quốc</p>
                                    <Link to={'/products'} className='btn btn--primary'>Mua ngay</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;