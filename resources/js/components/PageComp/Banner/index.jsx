import { Link } from 'react-router-dom';
import { useState } from 'react';
import images from '~/assets/images';
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const cx = classNames.bind(styles);

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function Banner({ categories }) {
    const [isShowCategory, setIsShowCategory] = useState(true);
    const bannerImages = [images.banner, images.banner1, images.banner2];

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
                                        <Link to={'/products'}>Nhà Sách Online</Link>
                                    </li>
                                    {categories && categories?.map((category, index) => (
                                        <li key={index}>
                                            <Link to={`/products/${category?.id}`}>{category?.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <div className='col l-10 m-12 c-12'>
                            <div className={cx('banner')}>
                                <div className={cx('banner-text')}>
                                    <span>Sách trong nước và nước ngoài</span>
                                    <h2>Sách chính hãng 100%</h2>
                                    <p>Miễn phí giao hàng trên toàn quốc</p>
                                    <Link to={'/products'} className='btn btn--primary'>Mua ngay</Link>
                                </div>
                                <Carousel 
                                    responsive={responsive} 
                                    autoPlay={true} 
                                    autoPlaySpeed={3000}
                                    infinite={true}
                                >
                                    <img src={images.banner} alt="" />
                                    <img src={images.banner1} alt="" />
                                    <img src={images.banner2} alt="" />
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;