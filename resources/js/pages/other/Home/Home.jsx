import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import ProductList from '~/components/ProductList';
import Banner from '~/components/Banner';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import axios from 'axios';
const cx = classNames.bind(styles);

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [productCategories, setProductCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories')
            .then(res => {
                console.log(res);
                setCategories(res.data.categories);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        const fetchProductCategories = async () => {
            const tempProductCategories = [];
            for (const item of categories) {
                try {
                    const res = await axios.get('/api/products', {
                        params: {
                            category_id: item.id,
                        }
                    });
                    console.log(res);
                    tempProductCategories.push({ data: res.data.products.data, id: item.id });
                } catch (err) {
                    console.log(err);
                }
            }
            setProductCategories(tempProductCategories);
        };

        if (categories.length > 0) {
            fetchProductCategories();
        }
    }, [categories]);

    console.log(productCategories);


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
            <Banner categories={categories}></Banner>
            <div className={cx('slider-wrapper')}>
                <div className={cx('slider')}>
                    <Carousel responsive={responsive}>
                        {categories.length > 0 && categories.map((item, index) => {
                            return (
                                <Link to={`/products/category/${item?.name}`} className={cx('slider-item')} key={index}>
                                    <img src={item?.images ?? images.cat_1} alt={item?.name} />
                                    <p>{item?.name}</p>
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
                        {
                            categories.length > 0 && categories.map((category, index) => {
                                return (
                                    <div>
                                        <div className={cx('categories-item')}>
                                            <h3>{category.name}</h3>
                                        </div>
                                        <ProductList data={productCategories.length > 0 ? productCategories.filter((item) => item.id === category.id)[0]?.data : []}></ProductList>
                                    </div>
                                )
                            })
                        }

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
