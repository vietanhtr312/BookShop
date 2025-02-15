import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import ProductList from '~/components/Product/ProductList';
import Banner from '~/components/PageComp/Banner';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { getCategories } from '~/services/categoryService';
import { getProducts, getHomeProducts } from '~/services/productService';
import LoadingPage from '../Loading';
const cx = classNames.bind(styles);

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.categories);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchProductCategories = async () => {
        setLoading(true);
        try {
            const res = await getHomeProducts();
            setProductCategories(res.products.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (categories.length > 0) {
            fetchProductCategories();
        }
    }, [categories]);

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

    console.log(productCategories);

    return (
        <div className="grid wide">
            <Banner categories={categories}></Banner>
            <div className={cx('slider-wrapper')}>
                <div className={cx('slider')}>
                    <Carousel responsive={responsive}>
                        {categories.length > 0 && categories.map((item, index) => {
                            return (
                                <Link to={`/products/${item.id}`} className={cx('slider-item')} key={index}>
                                    <img src={item?.image ?? images.cat_1} alt={item?.name} />
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
                        {loading ? <LoadingPage height="100px" /> :
                            categories.length > 0 && categories.map((category, index) => {
                                return (
                                    <div>
                                        <div className={cx('categories-item')}>
                                            <h3>{category.name}</h3>
                                        </div>
                                        <ProductList data={productCategories ? productCategories.filter(item => item.category_id === category.id) : []}></ProductList>
                                    </div>
                                )

                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
