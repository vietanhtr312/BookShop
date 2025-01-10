import React, { useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import background from '~/assets/background';
import Button from '~/components/Button';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

import images from '~/assets/images';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

const Home = () => {

    const [categories, setCategories] = useState([
        {
            title: 'Sách Văn Học',
            images: images.cat_1,
        },
        {
            title: 'Sách Kinh Tế',
            images: images.cat_2,
        },
        {
            title: 'Sách Tâm Lý',
            images: images.cat_3,
        },
        {
            title: 'Sách Ngoại Ngữ',
            images: images.cat_4,
        },
    ]);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="grid wide">
            <div className={cx('slider-wrapper')}>
                <div className={cx('slider')}>
                    <Carousel responsive={responsive}>
                        {categories && categories.map((item, index) => {
                            return (
                                <Link to={`/products/category/${item?.title}`} className={cx('slider-item')} key={index}>
                                    <img src={item?.images} alt={item?.title} />
                                    <p>{item?.title}</p>
                                </Link>
                            )
                        })}
                    </Carousel>
                </div>
            </div>

            <div className={cx('featured-wrapper')}>
                <div className={cx('featured')}>
                    <div className={cx('section-title')}>
                        <h2>Sản phẩm nổi bật</h2>
                        <div>
                            <div className={cx('categories-item')}>
                                <h3>Sách Văn Học</h3>
                            </div>
                        </div>
                        <div>
                            <div className={cx('categories-item')}>
                                <h3>Sách Kinh Tế</h3>
                            </div>
                        </div>
                        <div>
                            <div className={cx('categories-item')}>
                                <h3>Sách Tâm Lý</h3>
                            </div>
                        </div>
                        <div>
                            <div className={cx('categories-item')}>
                                <h3>Sách Ngoại Ngữ</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx("banner-wrapper")}>
                <div className={cx("banner")}>
                    <div className="row">
                        <Link to='' className={cx("banner-pic col l-6 m-6 c-12")}>
                            <img src={images.banner1} alt="Banner" />
                        </Link>
                        <Link to='' className={cx("banner-pic col l-6 m-6 c-12")}>
                            <img src={images.banner2} alt="Banner" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
